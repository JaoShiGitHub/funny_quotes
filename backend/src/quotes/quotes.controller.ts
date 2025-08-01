import { UseGuards, Controller, Get, Post, Req, Body, Res } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { QuotesService } from './quotes.service';
import type { Request, Response } from 'express';

@UseGuards(AuthGuard)
@Controller('quotes')
export class QuotesController {
  constructor(private quotesService: QuotesService) { }

  @Get('all_quotes')
  async getQuotes() {
    const quotes_data = await this.quotesService.getQuotes();

    return {
      message: 'All quotes fetched successfully',
      quotes_data,
    };
  }

  @Post('vote')
  async voteQuote(@Req() req: Request, @Res() res: Response, @Body() body) {
    const userId = req['currentUser']?.id;
    const quoteId = body.quote_id
    try {
      await this.quotesService.voteQuote(userId, quoteId);
      return res.status(201).json({ message: "Voting completed" })
    } catch (error) {
      return res.status(400).json({message: "Voting failed"})
    }
  }
}
