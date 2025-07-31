
import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { pool } from "src/db/database";


@Injectable({})
export class RegisterService {

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
}