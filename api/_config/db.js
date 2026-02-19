import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

const pool = {
  query: async (text, params) => {
    try {
      const result = await sql.query(text, params);
      return { rows: result };
    } catch (error) {
      throw error;
    }
  }
};

export default pool;
