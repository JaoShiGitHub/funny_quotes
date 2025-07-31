import { Injectable, NotFoundException } from '@nestjs/common';
import { pool } from 'src/db/database';

@Injectable({})
export class UserService {
  // Get user data
  async getUserById(id: number) {
    const response = await pool.query(
      'SELECT * FROM users WHERE user_id = $1',
      [id],
    );
    return response.rows[0];
  }
  // Get user's quotes by ID
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
  // Create new quote
  async createNewQuote(id: number, quote: string) {
    try {
      await pool.query(
        'INSERT INTO quotes (quote, author_id) VALUES ($1, $2)',
        [quote, id],
      );
      return { message: 'Quote added successfully' };
    } catch (error) {
      console.error('Failed to add quote:', error);
      throw new Error('Could not create quote');
    }
  }

  // Delete a quote
  async deleteQuote(id: number) {
    const result = await pool.query('DELETE FROM quotes WHERE quote_id = $1', [
      id,
    ]);

    if (result.rowCount === 0) {
      throw new NotFoundException(`Not found quote with ID ${id}`);
    }

    return { message: `Quote ${id} deleted successfully` };
  }
}
