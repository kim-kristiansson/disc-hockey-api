import { RouterContext } from '../deps.ts'
import { getUserPlaylists } from '../services/spotifyApiService.ts'
import { CustomState } from '../types.ts'

type MyRouterContext = RouterContext<string, Record<string, string>, CustomState>

export const getUserPlaylistsHandler = async (ctx: MyRouterContext) => {
    const accessToken = ctx.state.accessToken

    if (!accessToken) {
        ctx.response.status = 401
        ctx.response.body = 'Unauthorized'
        return
    }

    const playlists = await getUserPlaylists(accessToken)

    if (playlists) {
        ctx.response.body = playlists
    } else {
        ctx.response.status = 500
        ctx.response.body = 'Failed to fetch playlists'
    }
}
