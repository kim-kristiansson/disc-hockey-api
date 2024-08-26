import { Router } from 'https://deno.land/x/oak/mod.ts'
import client from './database/connection.ts'

const router = new Router()

router.get('/users', async (context) => {
    const result = await client.queryObject('SELECT * FROM users;')
    context.response.body = result.rows
})

export default router
