import { Injectable, NotFoundException } from '@nestjs/common';
import { pool } from 'src/db/database';

@Injectable({})
export class QuotesService {
  async getQuotes() {
    // console.log('QuotesService.getQuotes() was called ✅');

    const response = await pool.query(`
  SELECT 
    q.quote_id,
    q.quote,
    u.user_id AS author_id,
    u.username AS author,
    q.votes AS vote,
    COALESCE(ARRAY_AGG(qv.user_id), '{}') AS voters
  FROM quotes q
  JOIN users u ON q.author_id = u.user_id
  LEFT JOIN quote_votes qv ON q.quote_id = qv.quote_id
  GROUP BY q.quote_id, q.quote, q.votes, u.user_id, u.username
`);

    if (response.rows.length === 0) {
      throw new NotFoundException('Quotes not found');
    }
    return response.rows;
  }

  async voteQuote(userId: number, quoteId: number) {
    try {
      await pool.query(
        'INSERT INTO quote_votes (quote_id, user_id) VALUES ($1, $2)',
        [quoteId, userId],
      );
      return { message: 'Vote Successfully' };
    } catch (error) {
      console.error('Voting failed:', error);
      throw new Error('Voting failed');
    }
  }
}
