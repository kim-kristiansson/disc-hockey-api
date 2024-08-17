import express from 'express'
import dotenv from 'dotenv'
import { constructSpotifyAuthUrl } from './spotifyAuth.js'
import { handleSpotifyCallback } from './handleSpotifyCallback.js'

dotenv.config()

const server = express()
const port = process.env.PORT || 3000

server.get('/', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI
const STATE = 'random_state_value' // Ideally, this should be generated dynamically

server.get('/login', (req, res) => {
    const authUrl = constructSpotifyAuthUrl({
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        scope: ['user-read-private', 'user-read-email'],
        state: STATE,
        show_dialog: true,
    })

    res.redirect(authUrl)
})

server.get('/callback', async (req, res) => {
    const { error, state, code } = req.query

    if (error === 'access_denied') {
        console.log('Access denied by user')
        return res.status(400).json({ error: 'Access denied by user' })
    }

    console.log(`Received state: ${state}, code: ${code}`)
    if (!state || state !== STATE) {
        console.log('Invalid state parameter')
        return res.status(400).json({ error: 'Invalid state parameter' })
    }

    if (!code) {
        console.log('Missing authorization code')
        return res.status(400).json({ error: 'Missing authorization code' })
    }

    try {
        const tokens = await handleSpotifyCallback(
            new URLSearchParams(req.query as any),
            STATE,
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        )
        console.log('Tokens received:', tokens)
        return res.status(200).json({ message: 'Authorization successful' })
    } catch (error) {
        console.log('Error handling Spotify callback:', error.message)
        return res.status(400).json({ error: error.message })
    }
})

server.listen(port, () => {
    console.log(`Now listening on port ${port}`)
})

export default server
