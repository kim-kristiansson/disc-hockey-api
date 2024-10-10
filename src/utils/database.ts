import { DB } from '../deps.ts'
import { config, ensureDirSync } from '../deps.ts'

const { DATABASE_PATH } = config()

ensureDirSync('./src/db')

export const db = new DB(DATABASE_PATH || './src/db/database.db')

export function initializeDatabase() {
    db.query(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            refresh_token TEXT
        )
    `)

    db.query(`
        CREATE TABLE IF NOT EXISTS playlists (
            id TEXT PRIMARY KEY,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `)

    db.query(`
        CREATE TABLE IF NOT EXISTS tracks (
            id TEXT PRIMARY KEY,
            playlist_id INTEGER,
            FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE
        )
    `)
}

export function closeDatabase() {
    db.close()
}
