import { Injectable, NotFoundException } from '@nestjs/common';
import { pool } from 'src/db/database';

@Injectable({})
export class QuotesService {

  // Get all quotes
  async getQuotes() {

    const response = await pool.query(`
  SELECT 
    q.quote_id,
    q.quote,
    u.user_id AS author_id,
    u.username AS author,
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

  // Insert vote
  async voteQuote(userId: number, quoteId: number) {
    try {
   const result =   await pool.query(
        `INSERT INTO quote_votes (quote_id, user_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [quoteId, userId],
      );


          if (result.rowCount === 0) {
      // Insert was skipped — user already voted
      throw new Error('User has already voted.');
    }
      return { message: 'Vote Successfully' };
    } catch (error) {
      console.error('Voting failed:', error);
      throw new Error('Voting failed');
    }
  }
}
