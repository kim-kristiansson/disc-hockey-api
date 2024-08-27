import { RouterContext } from '../deps.ts'
import { getSpotifyAuthUrl, exchangeCodeForToken } from '../services/spotifyService.ts'

type MyRouterContext = RouterContext<string, Record<string, string>, Record<string, unknown>>

export const getAuthUrl = (context: MyRouterContext) => {
    const authUrl = getSpotifyAuthUrl()
    context.response.body = { url: authUrl }
}

export const handleSpotifyCallback = async (ctx: MyRouterContext) => {
    const code = ctx.request.url.searchParams.get('code')

    if (!code) {
        ctx.response.status = 400
        ctx.response.body = 'Authorization code is missing'
        return
    }

    try {
        const tokenData = await exchangeCodeForToken(code)

        if (tokenData) {
            console.log('Access Token:', tokenData.access_token)
            ctx.response.body = 'Authentication successful!'
        } else {
            ctx.response.status = 400
            ctx.response.body = 'Failed to exchange code for token'
        }
    } catch (error) {
        console.error('Error during token exchange:', error)
        ctx.response.status = 500
        ctx.response.body = 'Internal Server Error'
    }
}
