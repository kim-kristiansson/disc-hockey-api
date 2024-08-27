import { Application } from './deps.ts'
import authRoutes from './routes/authRoutes.ts'

const app = new Application()

app.use(authRoutes.routes())
app.use(authRoutes.allowedMethods())

console.log('Server running on http://localhost:3000')
await app.listen({ port: 3000 })
