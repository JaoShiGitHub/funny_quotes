import {
  Body,
  Controller,
  BadRequestException,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { RegisterService } from './register.service';

@Controller('new_user')
export class RegisterController {
constructor(private registerService: RegisterService) {}

    // POST /new-user/register
    @Post('register')
    async register(
      @Body() body: { username: string; password: string },
      @Res() res: Response,
    ) {
      const { username, password } = body;
      try {

        const response = await this.registerService.register(username, password);
          console.log("Register checking: ", response);
        res.status(201).json(response);
      } catch (error) {
        console.error('Registration error:', error);
        throw new BadRequestException('Could not register user');
      }
    }
}