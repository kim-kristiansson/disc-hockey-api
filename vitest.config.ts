import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        setupFiles: 'vitest.setup.ts',
        coverage: {
            reporter: ['text', 'html'],
            exclude: ['tests/', '*.config.ts'],
        },
        exclude: [
            '**/node_modules/**', // Default exclusion
            '**/dist/**', // Default exclusion
            '**/cypress/**', // Exclude the Cypress directory
            '**/*.cy.ts', // Exclude Cypress test files by extension if they're in the same directory
            '**/*.cy.js', // Exclude Cypress test files by extension if they're in the same directory
        ],
    },
})
