import {
  UseGuards,
  Controller,
  Get,
  Req,
  Post,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // ---------- GET ----------
  
  // GET /user/info :  Fetch user data
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

 // GET /user/my_quotes :  Fetch all quotes of a user
  @Get('my_quotes')
  async getMyQuotes(@Req() req: Request) {
    const userId = req['currentUser']?.id;
    const username = req['currentUser']?.username;

    try {
      const quotes_data = await this.userService.getQuotesById(userId);
      return {
        message: `${username}'s quotes have been fetched`,
        quotes_data,
      };
    } catch (error) {
      return {
        message: `Failed to get quotes: ${error.message}`,
      };
    }
  }

  // ---------- POST ----------

  // POST /user/new_quote :  Create a new quote
  @Post('new_quote')
  async createQuote(@Req() req: Request, @Body() body) {
    const userId = req['currentUser']?.id;

    return this.userService.createNewQuote(userId, body.quote);
  }

  // ---------- PUT ----------

  // PUT user/quote/edit :  Edit a quote
  @Put('quote/edit')
  async editQuote( @Body() body) {
 return this.userService.editQuote(body.quote_id,body.quote)
  }

  // ---------- DELETE ----------
  
  // DELETE user/quote/:id :  Delete a quote by ID
  @Delete('quote/:id')
  async deleteQuote(@Param('id') id: number) {
    return this.userService.deleteQuote(id);
  }
}
