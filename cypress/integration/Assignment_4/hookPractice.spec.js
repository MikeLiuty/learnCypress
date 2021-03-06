import '../../support/hooks'

context('Actions', () => {
    it('should add new address', ()=> {
        cy.get('[data-test=create]').click()
        cy.url().should('include', 'http://a.testaddressbook.com/addresses')
        cy.get('#address_first_name')
        .clear()
        .type('firstName')
        cy.get('#address_first_name')
        .clear()
        .type('firstName')
        cy.get('#address_last_name')
        .clear()
        .type('lastName')
        cy.get('#address_street_address')
        .clear()
        .type('Albany')
        cy.get('#address_city')
        .clear()
        .type('Auckland')
        cy.get('#address_zip_code')
        .clear()
        .type('123456')
        cy.get('[data-test=submit]').click()
    })
})
