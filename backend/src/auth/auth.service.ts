import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pool } from 'src/db/database';

@Injectable({})
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(username: string, password: string) {
    try {
      const user = await pool.query('SELECT * FROM users WHERE username = $1', [
        username,
      ]);
      const user_password = user.rows[0].password;

      if (password !== user_password) {
        return { message: 'Invalid Password' };
      }

      const token = this.jwtService.sign(
        { username: user.rows[0].username },
        { expiresIn: '1d' },
      );
      return { user: user.rows[0], token };
    } catch (error) {
      console.log('Login error: ', error);
      throw error;
    }
  }
}
