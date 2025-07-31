import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { pool } from 'src/db/database';

@Injectable({})
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // REGISTER
  async register(username: string, password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2)',
        [username, hashedPassword],
      );
      return { message: 'User registered successfully' };
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Username may already exist or something went wrong');
    }
  }

  // LOGIN
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
