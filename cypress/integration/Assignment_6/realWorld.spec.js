beforeEach(()=>{
    cy.visit('https://demo.realworld.io/#/login')
    cy.get('input[type=email]').type('mike@test.com')
    cy.get('input[type=password]').type('Test123!')
    cy.get('button[type=submit]').click()
})

describe('RealWorld demo practice',()=>{
    context('action',()=>{
        it('Adding a new artical should return a valid request',()=>{
            cy.get('[show-authed="true"] > :nth-child(2) > .nav-link').click()
            cy.get(':nth-child(1) > .form-control').type('test artical')
            cy.get(':nth-child(2) > .form-control').type('about test')
            cy.get(':nth-child(3) > .form-control').type('write my artical')
            cy.get(':nth-child(4) > .form-control').type('articalTag')
            cy.intercept('POST', 'https://conduit.productionready.io/api/articles').as('postArtical')
            cy.get('.btn').click()
            cy.wait('@postArtical').should(({ request, response }) => {
                expect(request.headers).to.have.property('content-type', 'application/json;charset=UTF-8')
                expect(response.body.article).to.have.property('title','test artical')
                expect(response.body.article).to.have.property('body','write my artical')
                expect(response.body.article).to.have.property('description','about test')
        })
    })

    it('Page should return 500',()=>{
        cy.intercept({
            method: 'GET',
            url: 'https://conduit.productionready.io/api/articles?author=MikeTest&limit=5&offset=0',
          }, {
            statusCode: 500,
          }).as('wrongCode')
          cy.get(':nth-child(4) > .nav-link').click()
          cy.wait('@wrongCode').its('response.statusCode').should('equal',500)
    })
})
})