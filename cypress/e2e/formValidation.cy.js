/// <reference types="cypress" />

describe('form validation', () => {
    it('login submit', () => {
        cy.visit('/');

        cy.get('[data-cy="loginForm"] button[type="submit"]')
        .click();

        cy.get('[data-cy="alert"]')
        .invoke('text')
        .should('equal', 'All fields are required.')

        cy.get('[data-cy="alert"]')
        .should('have.class', 'to-red-600')

    })
})