import { Application } from 'https://deno.land/x/oak/mod.ts'
import { connectToDatabase } from './database/connection.ts'
import router from './routes.ts'
import { errorHandler } from './middleware/errorHandler.ts'

await connectToDatabase()

const app = new Application()

app.use(errorHandler)
app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Server is running on http://localhost:8000`)
await app.listen({ port: 8000 })
