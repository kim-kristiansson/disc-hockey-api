// cypress/integration/spotifyAuthorizationAccessDenied.spec.js

describe('Spotify Authorization Callback - Access Denied', () => {
    it('should respond with 400 Bad Request and an error message when access is denied', () => {
        cy.visit('/callback?error=access_denied')

        cy.contains('Access denied by user').should('exist')
    })
})
