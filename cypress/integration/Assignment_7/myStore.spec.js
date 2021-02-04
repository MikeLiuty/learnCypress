import './myStore.hooks'

describe('My Store automation',()=>{

    beforeEach(()=>{
        cy.get('.logo').click()
        cy.url().should('equal','http://automationpractice.com/index.php')
    })

    context('search bar test suite',()=>{
        it('search bar should able to process empty value and return reminder',()=>{
            cy.get('#search_query_top').should('be.visible')
            cy.get('#search_query_top').clear()
            cy.get('#searchbox > .btn').click()
            cy.url().should('equal','http://automationpractice.com/index.php?controller=search&orderby=position&orderway=desc&search_query=&submit_search=')
            cy.get('.heading-counter').should('contain', '0 results have been found.')
            cy.get('.alert').should('contain', 'Please enter a search keyword')
        })
    })

    context('mouse hover test suite',()=>{
        it.only('mouse hover should display buttons',()=>{
            cy.get('#homefeatured > .first-in-line.first-item-of-tablet-line > .product-container > .left-block > .product-image-container').eq(0).trigger('mouseover')
            cy.get('span:contains("Add to cart")').should('be.visible')
            cy.get('span:contains("More")').should('be.visible')
            
        }) 
    })

    context('account test suite',()=>{

    })
})