import { describe, it, expect } from 'vitest'
import { constructSpotifyAuthUrl, SpotifyAuthParams } from '../src/spotifyAuth'
import nock from 'nock'
import { handleSpotifyCallback } from '../src/handleSpotifyCallback'

describe('Spotify Authorization URL Construction', () => {
    const params: SpotifyAuthParams = {
        client_id: 'your_client_id',
        redirect_uri: 'http://localhost:3000/callback',
        scope: ['user-read-private', 'user-read-email'],
        state: 'random_state_value',
        show_dialog: true,
    }

    const authUrl = constructSpotifyAuthUrl(params)

    it('should include the correct client_id', () => {
        expect(authUrl).toContain(`client_id=${params.client_id}`)
    })

    it('should set response_type to "code"', () => {
        expect(authUrl).toContain('response_type=code')
    })

    it('should include and correctly URL-encode the redirect_uri', () => {
        expect(authUrl).toContain(`redirect_uri=${encodeURIComponent(params.redirect_uri)}`)
    })

    it('should include the correct scope parameter', () => {
        const expectedScope = encodeURIComponent(params.scope.join(' ')).replace(/%20/g, '+')
        expect(authUrl).toContain(`scope=${expectedScope}`)
    })

    it('should include the state parameter', () => {
        expect(authUrl).toContain(`state=${params.state}`)
    })

    it('should set show_dialog to true', () => {
        expect(authUrl).toContain('show_dialog=true')
    })
})

describe('Spotify Callback Handling', () => {
    const clientId = 'your_client_id'
    const clientSecret = 'your_client_secret'
    const redirectUri = 'http://localhost:3000/callback'
    const storedState = 'random_state_value'

    it('should handle callback with a valid authorization code', async () => {
        const query = new URLSearchParams({
            code: 'valid_auth_code',
            state: storedState,
        })

        nock('https://accounts.spotify.com').post('/api/token').reply(200, {
            access_token: 'mock_access_token',
            refresh_token: 'mock_refresh_token',
        })

        const tokenResponse = await handleSpotifyCallback(
            query,
            storedState,
            clientId,
            clientSecret,
            redirectUri
        )

        expect(tokenResponse.access_token).toBe('mock_access_token')
        expect(tokenResponse.refresh_token).toBe('mock_refresh_token')
    })

    it('should throw an error if the state is invalid', async () => {
        const query = new URLSearchParams({
            code: 'valid_auth_code',
            state: 'invalid_state',
        })

        await expect(
            handleSpotifyCallback(query, storedState, clientId, clientSecret, redirectUri)
        ).rejects.toThrow('Invalid state or missing code')
    })

    it('should throw an error if the authorization code is missing', async () => {
        const query = new URLSearchParams({
            state: storedState,
        })

        await expect(
            handleSpotifyCallback(query, storedState, clientId, clientSecret, redirectUri)
        ).rejects.toThrow('Invalid state or missing code')
    })
})
