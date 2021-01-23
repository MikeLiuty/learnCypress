// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('addToCart', (cartItems) =>{
    cy.visit('https://www.saucedemo.com/')
    cy.get('#user-name')
    .type('standard_user');
    cy.get('#password')
    .type('secret_sauce')
    cy.get('#login-button').click();
    for(let n = 0; n < cartItems; n ++){
        cy.get('.inventory_list').find('button').eq(n).click();
    }
    cy.get('button:contains("REMOVE")').should('have.length',cartItems);
    cy.get('.fa-layers-counter').should('be.visible').should('have.text',cartItems);
})

Cypress.Commands.add('clearCart', () =>{
    cy.get('button:contains("REMOVE")').click({ multiple: true })
    cy.get('button:contains("REMOVE")').should('not.exist')
    cy.get('.fa-layers-counter').should('not.exist')
})