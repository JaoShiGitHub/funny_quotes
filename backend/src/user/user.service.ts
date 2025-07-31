import { Injectable, NotFoundException } from '@nestjs/common';
import { pool } from 'src/db/database';

@Injectable({})
export class UserService {
  async getUserById(id: number) {
    const response = await pool.query(
      'SELECT * FROM users WHERE user_id = $1',
      [id],
    );
    return response.rows[0];
  }

  async getQuotesById(id: number) {
    const response = await pool.query(
      'SELECT * FROM quotes WHERE author_id = $1',
      [id],
    );

    if (response.rows.length === 0) {
      throw new NotFoundException('Quotes not found');
    }
    
    return response.rows;
  }
}
