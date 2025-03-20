/// <reference types="cypress" />

describe('Accessing a private screen', () => {
    before(() => {
        cy.login('dona@dona.com', 'password');
    });

    it('should allow accessing the private page elements', () => {
        cy.get('[data-cy^="edit-button-"]').first().click();

    });
});