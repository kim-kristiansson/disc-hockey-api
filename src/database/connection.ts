// src/database/connection.ts
import { Client } from 'https://deno.land/x/postgres/mod.ts'
import config from '../config.ts'

const client = new Client({
    user: config.DB_USER,
    database: config.DB_NAME,
    hostname: config.DB_HOST,
    port: config.DB_PORT,
    password: config.DB_PASSWORD,
})

export const connectToDatabase = async () => {
    await client.connect()
    console.log('Connected to PostgreSQL')
}

export default client
