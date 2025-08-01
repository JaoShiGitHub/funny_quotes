import {
  Body,
  Controller,
  UseGuards,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { RegisterService } from './register.service';
import { RegisterGuard } from './register.guard';

@UseGuards(RegisterGuard)
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
        // console.log("Register checking: ", response);

        return res.status(201).json({message: "New user has been created" ,response: response});
      } catch (error) {
        console.error('Registration error:', error);
        return res.status(400).json({ message: "Could not register user", error: error.message });
      }
    }
}