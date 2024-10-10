import { Router } from '../deps.ts'
import authRouter from './authRoutes.ts'

const router = new Router()

// AUTH ROUTES
router.use(authRouter.routes())
router.use(authRouter.allowedMethods())

export default router
