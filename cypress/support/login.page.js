export class LoginPage{
    visit(){
        cy.visit('https://www.saucedemo.com/')
      }

    login(){
        cy.get('#user-name')
        .clear()
        .type('standard_user')
        cy.get('#password')
        .clear()
        .type('secret_sauce')
        cy.get('#login-button').click();
        cy.url().should('include', 'https://www.saucedemo.com/inventory.html');
    }
}

export const loginPage = new LoginPage()