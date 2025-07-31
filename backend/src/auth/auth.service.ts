import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { pool } from 'src/db/database';

@Injectable({})
export class AuthService {
  constructor(private jwtService: JwtService) {}



  // LOGIN
  async login(username: string, password: string) {
    try {
      const data = await pool.query('SELECT * FROM users WHERE username = $1', [
        username,
      ]);

      const user = data.rows[0];

      if (!user || user.length === 0) {
        throw new NotFoundException(`${username} not found`);
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new UnauthorizedException('Invalid password');
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
