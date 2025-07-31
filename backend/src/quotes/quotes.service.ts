import { Injectable, NotFoundException } from '@nestjs/common';
import { pool } from 'src/db/database';

@Injectable({})
export class QuotesService {
    async getQuotes() {
        console.log("QuotesService.getQuotes() was called ✅");

        const response = await pool.query('SELECT * FROM quotes');
         console.log('DB raw response:', response);

        if (response.rows.length === 0) {
            throw new NotFoundException("Quotes not found")
        }
        return response.rows
    }
}