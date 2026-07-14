import { Controller, Get, Query, Param, Post, Body, Put } from '@nestjs/common';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('user')
export class UserController {
  @Get()
  getUsers(@Query('name') name: string) {
    const users = [
      { id: 1, name: 'Huong' },
      { id: 2, name: 'Hung' },
    ];

    if (name) {
      return users.filter((user) => {
        return user.name.toLowerCase().includes(name.toLowerCase());
      });
    }

    return users;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return { id, name: 'Nguyen Quoc Huong' };
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return { data: createUserDto, message: 'User created successfully' };
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return {
      data: { id, ...updateUserDto },
      message: 'User updated successfully',
    };
  }
}
