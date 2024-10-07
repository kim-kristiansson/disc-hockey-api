import { Router } from '../deps.ts'
import { getUserPlaylistsHandler } from '../controllers/playlistController.ts'

const router = new Router()

router.get('/user/playlists', getUserPlaylistsHandler)

export default router
