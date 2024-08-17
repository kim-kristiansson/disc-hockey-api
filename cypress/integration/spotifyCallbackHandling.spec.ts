// cypress/integration/spotifyCallbackHandling.spec.js

describe('Spotify Callback Handling', () => {
    const clientId = 'your_client_id'
    const clientSecret = 'your_client_secret'
    const redirectUri = 'http://localhost:3000/callback'
    const storedState = 'random_state_value'

    it('should handle callback with a valid authorization code', () => {
        cy.intercept('POST', 'https://accounts.spotify.com/api/token', {
            statusCode: 200,
            body: {
                access_token: 'mock_access_token',
                refresh_token: 'mock_refresh_token',
            },
        }).as('getToken')

        cy.visit(`/callback?code=valid_auth_code&state=${storedState}`)

        cy.wait('@getToken').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
            expect(interception.response.body.access_token).to.eq('mock_access_token')
            expect(interception.response.body.refresh_token).to.eq('mock_refresh_token')
        })
    })

    it('should throw an error if the state is invalid', () => {
        cy.visit('/callback?code=valid_auth_code&state=invalid_state')

        cy.contains('Invalid state or missing code').should('exist')
    })

    it('should throw an error if the authorization code is missing', () => {
        cy.visit(`/callback?state=${storedState}`)

        cy.contains('Invalid state or missing code').should('exist')
    })
})
