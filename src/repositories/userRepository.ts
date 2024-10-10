import { db } from '../utils/database.ts'

export function findUserById(id: string) {
    return db.query(`SELECT * FROM users WHERE id = ?`, [id])
}
