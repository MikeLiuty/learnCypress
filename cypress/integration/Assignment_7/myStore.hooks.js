before(()=>{
    cy.visit('http://automationpractice.com/index.php?controller=authentication&back=my-account')
    cy.get('#email')
      .clear()
      .type('mikeliuty@gmail.com')
    cy.get('#passwd')
      .clear()
      .type('Test123{enter}')
      cy.url().should('equal','http://automationpractice.com/index.php?controller=my-account')
})

