// cypress/integration/spotifyInvalidOrMissingState.spec.js

describe('Spotify Authorization Callback - Invalid or Missing State', () => {
    const CLIENT_ID = 'mock_client_id'
    const CLIENT_SECRET = 'mock_client_secret'
    const REDIRECT_URI = 'http://localhost:3000/callback'
    const STATE = 'random_state_value'

    it('should respond with 400 Bad Request when state parameter is missing', () => {
        cy.visit('/callback?code=validCode')

        cy.contains('Invalid state parameter').should('exist')
    })

    it('should respond with 400 Bad Request when state parameter is invalid', () => {
        cy.visit('/callback?state=invalid_state')

        cy.contains('Invalid state parameter').should('exist')
    })

    it('should return 200 if access is successful on /callback', () => {
        cy.intercept('POST', 'https://accounts.spotify.com/api/token', {
            statusCode: 200,
            body: {
                access_token: 'mock_access_token',
                refresh_token: 'mock_refresh_token',
            },
        }).as('getToken')

        cy.visit(`/callback?state=${STATE}&code=valid_auth_code`)

        cy.wait('@getToken').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
            cy.contains('Authorization successful').should('exist')
        })
    })
})
