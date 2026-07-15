import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoggerService } from './user.logger';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private readonly logger: UserLoggerService) {}

  private users: User[] = [
    { id: 1, name: 'Huong', email: 'huong@example.com' },
    { id: 2, name: 'Hung', email: 'hung@example.com' },
  ];

  findAllUsers(name: string = '') {
    this.logger.log(`Finding users with name: ${name}`);
    return this.users.filter((user) => {
      return user.name.toLowerCase().includes(name.toLowerCase());
    });
  }

  findUserById(id: number): User | undefined {
    this.logger.log(`Finding user with ID: ${id}`);
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  createUser(dto: CreateUserDto) {
    this.logger.log(`Creating user`);

    const newUser: User = { id: this.users.length + 1, ...dto };
    this.users.push(newUser);

    return newUser;
  }

  updateUser(id: number, dto: UpdateUserDto) {
    this.logger.log(`Updating user ${id}`);

    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;

    this.users[index] = { ...this.users[index], ...dto };
    return this.users[index];
  }

  deleteUser(id: number) {
    this.logger.log(`Deleting user ${id}`);

    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;

    const deletedUser = this.users.splice(index, 1); // splice returns an array of deleted elements
    return deletedUser[0];
  }
}
