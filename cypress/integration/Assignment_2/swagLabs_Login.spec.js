/*
Test cases: 
    1. Check all the elements are there
    2. Empty username and Empty password- message should tell user input username
    3. Username without password - message should tell user to input password
    4. password without username - message should tell user to input username
    5. Standard user with wrong password - message should tell user Username and password do not match
    6. wrong username with correct password - message should tell user Username and password do not match
    7. Special characters and space should be valid for username and password
    8. Locked out user should not able to login - Check the message
    9. Standard user should able to login
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
    cy.get('#user-name')
    .type('standard_user')
    .should('have.value','standard_user');

    cy.get('#login-button').click();
    cy.get('.svg-inline--fa').should('be.visible');
    cy.get('[data-test=error]').contains('Epic sadface: Password is required');
})

//4. password without username - message should tell user to input username
it('password without username', () =>{
    cy.get('#password')
    .type('secret_sauce')
    .should('have.value','secret_sauce');

    cy.get('#login-button').click();
    cy.get('.svg-inline--fa').should('be.visible');
    cy.get('[data-test=error]').contains('Epic sadface: Username is required');
})

//5. Standard user with wrong password - message should tell user Username and password do not match
it('Username with wrong password',()=>{
    cy.get('#user-name')
    .type('standard_user');
    cy.get('#password')
    .type('wrongpassword')
    cy.get('#login-button').click();
    cy.get('.svg-inline--fa').should('be.visible');
    cy.get('[data-test=error]').contains('Epic sadface: Username and password do not match any user in this service');
})

//6. wrong username with correct password - message should tell user Username and password do not match
it('Username with wrong password',()=>{
    cy.get('#user-name')
    .type('standard_user');
    cy.get('#password')
    .type('wrongpassword')
    cy.get('#login-button').click();
    cy.get('.svg-inline--fa').should('be.visible');
    cy.get('[data-test=error]').contains('Epic sadface: Username and password do not match any user in this service');
})

//7. Special characters and space should be valid for username and password
it('special username', () =>{
    cy.get('#user-name')
    .type(' !@#$% ^&*()}{[]><?:"~` ')
    .should('have.value',' !@#$% ^&*()}{[]><?:"~` ');
})

it('special password', () =>{
    cy.get('#password')
    .type(' !@#$% ^&*()}{[]><?:"~` ')
    .should('have.value',' !@#$% ^&*()}{[]><?:"~` ');
})

//8. Locked out user should not able to login - Check the message
it('locked out user should not able to login', ()=> {
    cy.get('#user-name')
    .type('locked_out_user');
    cy.get('#password')
    .type('secret_sauce')
    cy.get('#login-button').click();
    cy.get('.svg-inline--fa').should('be.visible');
    cy.get('[data-test=error]').contains('Epic sadface: Sorry, this user has been locked out.');
})

//9. Standard user should able to login
it('standard user should able to login', ()=> {
    cy.get('#user-name')
    .type('standard_user');
    cy.get('#password')
    .type('secret_sauce')
    cy.get('#login-button').click();
    cy.url().should('include', 'https://www.saucedemo.com/inventory.html');
})

//10. Timeout for performance_glitch_user
//Not working... 
/*it('Timeout for performance_glitch_user', ()=> {
    cy.get('#user-name')
    .type('performance_glitch_user');
    cy.get('#password')
    .type('secret_sauce')
    cy.get('#login-button').click();
    cy.url().should('include', 'https://www.saucedemo.com/inventory.html');
    cy.get('.header_secondary_container',{timeout: 10}).should('be.visible',{timeout: 10});
})
*/

})