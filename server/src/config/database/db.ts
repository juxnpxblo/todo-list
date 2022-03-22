import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function useQuery<T extends any[]>(
  query: string,
  params?: Array<any>
) {
  const res = await pool.query(query, params);
  return res.rows as T;
}
