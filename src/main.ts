import { Application } from './deps.ts'
import { config } from './deps.ts'
import router from './routes/index.ts'
import { closeDatabase, initializeDatabase } from './utils/database.ts'

const app = new Application()

initializeDatabase()

const { PORT } = config()

app.use(router.routes())
app.use(router.allowedMethods())

app.use((ctx) => {
    ctx.response.status = 404
    ctx.response.body = 'Not Found'
})

addEventListener('beforeExit', () => {
    console.log('Closing database connection...')
    closeDatabase()
})

await app.listen({ port: Number(PORT) || 8000 })
