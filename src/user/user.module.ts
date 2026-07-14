import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserLoggerService } from './user.logger';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserLoggerService],
})
export class UserModule {}
