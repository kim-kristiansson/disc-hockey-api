import { Context, Middleware } from '../deps.ts'
import { refreshAccessToken } from '../services/spotifyService.ts'
import { isTokenExpired } from '../utils/tokenUtils.ts'

export const sessionMiddleware: Middleware = async (ctx: Context, next: () => Promise<unknown>) => {
    const accessToken = await ctx.cookies.get('access_token')
    const refreshToken = await ctx.cookies.get('refresh_token')
    const expiryTime = await ctx.cookies.get('expiry_time')

    ctx.state.accessToken = accessToken
    ctx.state.expiryTime = expiryTime

    if (accessToken && isTokenExpired(expiryTime)) {
        if (refreshToken) {
            const newTokenData = await refreshAccessToken(refreshToken)
            if (newTokenData && newTokenData.access_token) {
                ctx.state.accessToken = newTokenData.access_token
                if (newTokenData.refresh_token) {
                    await ctx.cookies.set('refresh_token', newTokenData.refresh_token, {
                        httpOnly: true,
                        secure: false, // Set to true in production
                        sameSite: 'lax',
                        path: '/',
                    })
                }
                await ctx.cookies.set('access_token', newTokenData.access_token, {
                    httpOnly: true,
                    secure: false, // Set to true in production
                    sameSite: 'lax',
                    path: '/',
                })
                // Update expiry time
                const newExpiryTime = Date.now() + newTokenData.expires_in * 1000
                await ctx.cookies.set('expiry_time', newExpiryTime.toString(), {
                    httpOnly: true,
                    secure: false, // Set to true in production
                    sameSite: 'lax',
                    path: '/',
                })
                ctx.state.expiryTime = newExpiryTime.toString()
            }
        }
    }

    await next()

    if (ctx.state.accessToken) {
        await ctx.cookies.set('access_token', ctx.state.accessToken, {
            httpOnly: true,
            secure: false, // Set to true in production
            sameSite: 'lax',
            path: '/',
        })
    }

    if (ctx.state.expiryTime) {
        await ctx.cookies.set('expiry_time', ctx.state.expiryTime, {
            httpOnly: true,
            secure: false, // Set to true in production
            sameSite: 'lax',
            path: '/',
        })
    }
}
