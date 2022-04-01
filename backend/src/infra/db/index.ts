import { Pool } from 'pg'

import { getDbHost, getDbName, getDbPort, getDbUser, getDbPass } from '../../shared/utils'

const pool = new Pool({
  host: getDbHost(),
  port: getDbPort(),
  user: getDbUser(),
  password: getDbPass(),
  database: getDbName()
})

const initialSQL = `
CREATE EXTENSION IF NOT EXISTS "unaccent";

CREATE TABLE IF NOT EXISTS public.student (
  "ra" VARCHAR(20) NOT NULL,
  "name" VARCHAR(100) NOT NULL,
  "email" TEXT NOT NULL,
  "cpf" VARCHAR(11) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT pk_student PRIMARY KEY (ra)
);
`

export async function connectDb (): Promise<void> {
  try {
    const client = await pool.connect()
    try {
      await client.query(initialSQL)
    } finally {
      client.release()
    }
  } catch (err: unknown) {
    console.error(`Connection to Database failed: ${JSON.stringify(err)}`)
    process.exit(1)
  }
}

export async function closeDb (): Promise<void> {
  await pool.end()
}

export async function execSQL<T> (sql: string, params?: any[]): Promise<T[]> {
  console.debug(params ? `SQL to be executed: ${sql} [${params}]` : `SQL to be executed: ${sql}`)
  const { rows } = await pool.query<T>(sql, params)
  return rows
}
