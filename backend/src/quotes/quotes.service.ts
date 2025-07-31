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
        u.username AS author
      FROM quotes q
      JOIN users u ON q.author_id = u.user_id
    `);

    if (response.rows.length === 0) {
      throw new NotFoundException('Quotes not found');
    }
    return response.rows;
  }
}
