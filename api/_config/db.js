import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL, { fullResults: false });

const pool = {
  query: async (text, params = []) => {
    try {
      let result;
      if (params.length === 0) {
        // No params: use tagged template
        result = await sql.query(text);
      } else {
        // With params: use sql.query()
        result = await sql.query(text, params);
      }
      return { rows: Array.isArray(result) ? result : [] };
    } catch (error) {
      throw error;
    }
  }
};

export default pool;
