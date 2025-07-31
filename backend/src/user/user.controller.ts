import {
  UseGuards,
  Controller,
  Get,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('info')
  async getUserInfo(@Req() req: Request) {
    const userId = req['currentUser']?.id;

    console.log('currentUser:', req['currentUser']);
    console.log('userId:', userId);

    try {
      const user_data = await this.userService.getUserById(userId);
      return {
        message: 'User info fetched successfully',
        user_data,
      };
    } catch (error) {
      return {
        message: `Failed to get user info: ${error.message}`,
      };
    }
  }
}
