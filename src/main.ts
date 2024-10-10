import { config } from './deps.ts'

const env = config()

const CLIENT_ID = env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = env.SPOTIFY_REDIRECT_URI

async function handleRequest(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname

    if (path === '/' && request.method === 'GET') {
        return Promise.resolve(new Response('Hello, world!'))
    }

    if (path === '/login' && request.method === 'GET') {
        console.log(Deno.env.get('CLIENT_ID'))
        const scope = encodeURIComponent('user-read-private user-read-email')
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${scope}&redirect_uri=${REDIRECT_URI}`
        return Promise.resolve(
            new Response(null, {
                status: 302,
                headers: {
                    Location: authUrl,
                },
            })
        )
    }

    if (path === '/callback' && request.method === 'GET') {
        const callbackUrl = new URL(request.url)
        const code = callbackUrl.searchParams.get('code')
        const error = callbackUrl.searchParams.get('error')

        if (error) {
            return Promise.resolve(new Response('Error: ' + error))
        }

        if (!code) {
            return Promise.resolve(new Response('Error: Code not found'))
        }

        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
            }),
        })

        if (!tokenResponse.ok) {
            return Promise.resolve(new Response('Error: ' + tokenResponse.statusText))
        }

        const token = await tokenResponse.json()

        return Promise.resolve(new Response(JSON.stringify(token)))
    }

    return Promise.resolve(new Response('Not found', { status: 404 }))
}

Deno.serve({ port: 8000, handler: handleRequest })
