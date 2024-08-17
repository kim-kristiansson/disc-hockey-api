import axios from 'axios'

interface TokenResponse {
    access_token: string
    refresh_token: string
}

export const handleSpotifyCallback = async (
    query: URLSearchParams,
    storedState: string,
    clientId: string,
    clientSecret: string,
    redirectUri: string
): Promise<TokenResponse> => {
    const code = query.get('code')
    const state = query.get('state')

    if (!code || !state || state !== storedState) {
        throw new Error('Invalid state or missing code')
    }

    const tokenResponse = await axios.post<TokenResponse>(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret,
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    )

    return tokenResponse.data
}
