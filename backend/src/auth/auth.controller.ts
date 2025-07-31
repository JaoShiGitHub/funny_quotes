import {
  Body,
  Controller,
  BadRequestException,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

// POST /auth/register
  @Post('register')
  async register(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    const { username, password } = body;
    try {
      const response = await this.authService.register(username, password);
        console.log("Register checking: ", response);
      res.status(201).json(response);
    } catch (error) {
      console.error('Registration error:', error);
      throw new BadRequestException('Could not register user');
    }
  }

// POST /auth/login
  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    const { username, password } = body;
    const user = await this.authService.login(username, password);

    res.cookie('token', user.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      secure: false,
    });

    return res.json({ user: user.user });
  }
}
