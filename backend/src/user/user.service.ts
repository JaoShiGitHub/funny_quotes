import { Injectable } from '@nestjs/common';
import { pool } from 'src/db/database';


@Injectable({})
export class UserService {
  async getUserById(id: number) {
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    return response.rows[0];
    }
}