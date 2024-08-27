import { env } from '../config/env.ts'

export const getSpotifyAuthUrl = () => {
    const scope = 'user-read-private user-read-email'
    const authURL = `https://accounts.spotify.com/authorize?client_id=${
        env.SPOTIFY_CLIENT_ID
    }&response_type=code&redirect_uri=${env.SPOTIFY_REDIRECT_URI}&scope=${encodeURIComponent(
        scope
    )}`
    return authURL
}

export const exchangeCodeForToken = async (code: string) => {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`),
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: env.SPOTIFY_REDIRECT_URI,
        }),
    })

    if (tokenResponse.ok) {
        return await tokenResponse.json()
    } else {
        console.error('Error fetching token:', await tokenResponse.json())
        return null
    }
}
