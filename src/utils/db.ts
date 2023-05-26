import { Pool } from 'pg'
 
const pool = new Pool()
 
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

export async function query(text, params?) {
  return pool.query(text, params)
}
