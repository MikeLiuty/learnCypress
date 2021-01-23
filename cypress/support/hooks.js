before(function(){
    cy.visit('http://a.testaddressbook.com/addresses')
    cy.url().should ('include', 'testaddressbook');
    cy.get('#session_email')
    .clear()
    .type('mikeliuty@gmail.com');
    cy.get('#session_password')
    .clear()
    .type('Test123')
    cy.get('[data-test=submit]').click()
})

afterEach(function(){
    cy.get('[data-test=addresses]').click()
    cy.get('a:contains("Destroy")').click()

})

after(function(){
    cy.get('[data-test=sign-out]').click()
    cy.url().should('include', 'http://a.testaddressbook.com/sign_in')
})