import { constructSpotifyAuthUrl } from '../../src/spotifyAuth'

describe('Spotify Authorization URL Construction', () => {
    it('should construct the Spotify auth URL correctly', () => {
        const params = {
            client_id: 'your-client-id',
            redirect_uri: 'http://localhost:3000/callback',
            scope: ['user-read-private', 'user-read-email'],
            state: 'random_state_value',
            show_dialog: true,
        }

        // Call the function directly
        const authUrl = constructSpotifyAuthUrl(params)

        // Perform your assertions
        expect(authUrl).to.contain(`client_id=${params.client_id}`)
        expect(authUrl).to.contain(`response_type=code`)
        expect(authUrl).to.contain(`redirect_uri=${encodeURIComponent(params.redirect_uri)}`)
        expect(authUrl).to.contain(`scope=${params.scope.join('%20')}`)
        expect(authUrl).to.contain(`state=${params.state}`)
        expect(authUrl).to.contain(`show_dialog=true`)
    })
})
