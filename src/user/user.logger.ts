import { Injectable } from '@nestjs/common';

@Injectable()
export class UserLoggerService {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
}
