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
        it('mouse hover should display buttons',()=>{
            cy.get('#homefeatured > .first-in-line.first-item-of-tablet-line > .product-container > .left-block > .product-image-container').eq(0).trigger('mouseover')
            cy.get('span:contains("Add to cart")').should('be.visible')
            cy.get('span:contains("More")').should('be.visible')
            
        }) 
    })

    context('account test suite',()=>{
        beforeEach(()=>{
            cy.get('.account').click()
        })
        it('Empty cart should display no items',()=>{
            cy.get('span:contains("ORDER HISTORY AND DETAILS")').click()
            cy.get('.alert').should('contain','You have not placed any orders.')
        })
        it.only('Added items should display in the cart',()=>{
            cy.get('.logo').click()
            cy.get('span:contains("Add to cart")').eq(0).click({force:true})
            cy.get('.continue > span').click()
            cy.get('span:contains("Add to cart")').eq(1).click({force:true})
            cy.get('span:contains("Proceed to checkout")').click()
            cy.get('#summary_products_quantity').should('contain','2 Products')
            cy.get('#center_column').should('contain','Faded Short Sleeve T-shirts').and('contain','Blouse')
            cy.get('#total_price').invoke('text').then((finalPrice) => {
                var finalPrice = Number(finalPrice.replace(/\$/g,''))
                cy.get('#total_shipping').invoke('text').then((shippingPrice) => {
                    var shippingPrice = Number(shippingPrice.replace(/\$/g,''))
                    cy.get('#total_product').invoke('text').then((productPrice) => {
                        var productPrice = Number(productPrice.replace(/\$/g,''))
                        cy.get('#total_tax').invoke('text').then((taxPrice) => {
                            var taxPrice = Number(taxPrice.replace(/\$/g,''))
                            cy.get('#total_price_without_tax').invoke('text').then((noTax) => {
                                var noTax = Number(noTax.replace(/\$/g,''));
                                expect(parseInt(shippingPrice) + parseInt(productPrice)).eq(parseInt(noTax))
                                expect(parseInt(noTax) + parseInt(taxPrice)).eq(parseInt(finalPrice))
                                //I accidently found Cypress can't assert a number with decimals..
                            })
                        })
                    })
                })
            })

            cy.get('.cart_navigation > .button > span').click()
            cy.url().should('include','http://automationpractice.com/index.php?controller=order&step=1')
            cy.get('.cart_navigation > .button > span').click()
            cy.get('#cgv').check()
            cy.get('.cart_navigation > .button > span').click()
            cy.get('.cheque').click()
            cy.get('span:contains("I confirm my order")').click()
            cy.get('.alert').should('contain','Your order on My Store is complete.')
            cy.visit('http://automationpractice.com/index.php?controller=history')
            cy.get('#center_column').should('be.visible')
            cy.get('span:contains("Details")').eq(0).click()
            cy.get('.info-order').should('contain','Payment by check')
            cy.get('#center_column').should('contain','Faded Short Sleeve T-shirts').and('contain','Blouse')
        })
    })
})