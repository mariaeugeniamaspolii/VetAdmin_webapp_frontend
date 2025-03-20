/// <reference types="cypress" />

describe('form validation', () => {
    it('login submit', () => {
        cy.visit('/');

        cy.get('[data-cy="email"]')
        .type('dona@dona.com')

        cy.get('[data-cy="password"]')
        .type('password')

        cy.get('[data-cy="loginForm"] button[type="submit"]')
        .click();
    })
})