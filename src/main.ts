import { Application } from './deps.ts'
import authRoutes from './routes/authRoutes.ts'
import userRoutes from './routes/userRoutes.ts'
import playlistRoutes from './routes/playlistRoutes.ts'
import { sessionMiddleware } from './middleware/session.ts' // Correct path

const app = new Application()

app.use(sessionMiddleware)
app.use(authRoutes.routes())
app.use(authRoutes.allowedMethods())
app.use(userRoutes.routes())
app.use(userRoutes.allowedMethods())
app.use(playlistRoutes.routes())
app.use(playlistRoutes.allowedMethods())

console.log('Server running on http://localhost:3000')
await app.listen({ port: 3000 })
