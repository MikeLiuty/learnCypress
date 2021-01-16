/*
Test cases: 
    1. Check all the elements are there
    2. Empty username and Empty password- message should tell user input username
    3. Username without password - message should tell user to input password
    4. password without username - message should tell user to input username
    5. Standard user with wrong password - message should tell user Username and password do not match
    6. wrong username with correct password - message should tell user Username and password do not match
    
    2. Standard user should able to login
    3. Locked out user should not able to login - Check the message
    4. Problem user should able to login - fail
    5. Performance glich user should able to login
 

    9. Space before the standard user username
    10. space after the standard user username
    11. Check if api saved the username and password? 
    
    13. 
    14. 
*/

context('Actions', ()=> {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

//  1. Check all the elements are there
it('Should able to access to the url and find all the elements', ()=> {
    cy.url().should ('include', 'saucedemo');
    cy.get('img').should('be.visible');
    cy.get('form').should('be.visible');
    cy.get('.login_logo').should('be.visible');
    cy.get('[data-test=error]').should('not.exist');
})

// 2. Empty username and Empty password- message should tell user input username
it('Empty info should tell username is required',()=>{
    cy.get('#login-button').click();
    cy.get('.svg-inline--fa').should('be.visible');
    cy.get('[data-test=error]').contains('Epic sadface: Username is required');
})

//3. Username without password - message should tell user to input password
it('Username without password', () =>{
    cy.get('[data-test=username]')
    .type('standard_user')
    .should('have.value','standard_user');

    cy.get('#login-button').click();
    cy.get('.svg-inline--fa').should('be.visible');
    cy.get('[data-test=error]').contains('Epic sadface: Password is required');
})

//4. password without username - message should tell user to input username
it('password without username', () =>{
    cy.get('[data-test=password]')
    .type('secret_sauce')
    .should('have.value','secret_sauce');

    cy.get('#login-button').click();
    cy.get('.svg-inline--fa').should('be.visible');
    cy.get('[data-test=error]').contains('Epic sadface: Username is required');
})

//5. Standard user with wrong password - message should tell user Username and password do not match
it('Username with wrong password',()=>{
    cy.get('[data-test=username]')
    .type('standard_user');
    cy.get('[data-test=password]')
    .type('wrongpassword')
    cy.get('#login-button').click();
    cy.get('.svg-inline--fa').should('be.visible');
    cy.get('[data-test=error]').contains('Epic sadface: Username and password do not match any user in this service');
})

//6. wrong username with correct password - message should tell user Username and password do not match
it('Username with wrong password',()=>{
    cy.get('[data-test=username]')
    .type('standard_user');
    cy.get('[data-test=password]')
    .type('wrongpassword')
    cy.get('#login-button').click();
    cy.get('.svg-inline--fa').should('be.visible');
    cy.get('[data-test=error]').contains('Epic sadface: Username and password do not match any user in this service');
})

//7. 
})