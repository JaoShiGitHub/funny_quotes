import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { pool } from "src/db/database";

@Injectable({})
export class RegisterService {
  // REGISTER
  async register(username: string, password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [username, hashedPassword]
      );

      return { message: "User registered successfully" };
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error("Username may already exist or something went wrong");
    }
  }

  // Prevent same usernames
  async findByUsername(username: string): Promise<boolean> {
    try {
      const respond = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      return respond.rows.length > 0;
    } catch (error) {
      console.error("Database error in findByUsername:", error);
      throw new Error("Failed to check username in database");
    }
  }
}
