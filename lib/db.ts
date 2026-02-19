import { Pool } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function query(text: string, params?: (string | number | boolean | null)[]) {
  const start = Date.now()
  try {
    const result = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('[db] Executed query in ' + duration + 'ms')
    return result
  } catch (error) {
    console.error('[db] Database error:', error)
    throw error
  }
}

export async function getConnection() {
  return pool.connect()
}

export default pool
