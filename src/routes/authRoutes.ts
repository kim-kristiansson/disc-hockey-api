import { Router } from '../deps.ts'
import { config } from '../deps.ts'

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } = config()

const router = new Router()

router.get('/login', (ctx) => {
    const scope = encodeURIComponent('user-read-private user-read-email')
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=${scope}&redirect_uri=${encodeURIComponent(
        SPOTIFY_REDIRECT_URI
    )}`
    return ctx.response.redirect(authUrl)
})

router.get('/callback', async (ctx) => {
    const callbackUrl = new URL(ctx.request.url)
    const code = callbackUrl.searchParams.get('code')
    const error = callbackUrl.searchParams.get('error')

    if (error) {
        ctx.response.body = 'Callback Error: ' + error
        return
    }

    if (!code) {
        ctx.response.body = 'Callback Error: No code'
        return
    }

    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: SPOTIFY_REDIRECT_URI,
        }),
    })

    if (!tokenResponse.ok) {
        const errorBody = await tokenResponse.text()
        ctx.response.body = 'Token Error: ' + errorBody
        return
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token
    // const refreshToken = tokenData.refresh_token

    const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: 'Bearer ' + accessToken,
        },
    })

    if (!userResponse.ok) {
        ctx.response.status = userResponse.status
        ctx.response.body = 'failed to get user data'
        return
    }

    const userData = await userResponse.json()
    ctx.response.body = await userData.json()

    // ctx.response.body = await tokenResponse.json()
})

export default router
