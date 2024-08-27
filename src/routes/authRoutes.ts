import { Router } from '../deps.ts'
import { getAuthUrl, handleSpotifyCallback } from '../controllers/authController.ts'

const router = new Router()

// Route to get Spotify authorization URL
router.get('/auth/spotify', getAuthUrl)

// Callback route that handles the Spotify authorization response
router.get('/auth/callback', handleSpotifyCallback)

export default router
