/*
Test cases: 
1. All the elements should be visible on the page.
2. Adding one item to the cart the button should change to "remove", and going through all six of them, "add on cart" should not visible anymore. The cart item number on the page will be shown 6, then click the cart icon, all six items should be in the cart with 1 qulity for each of them. 
3. Click drop down menu and select price high to low, "Sauce Labs Fleece Jacket" should be on the top
4. Clicking shopping cart should nevagate to the cart page
*/


context ('Auctions', () =>{
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name')
        .type('standard_user');
        cy.get('#password')
        .type('secret_sauce')
        cy.get('#login-button').click();
    })

//1. All the elements should be visible on the page.
it("All the elements should be visible on the page.",()=>{
    cy.url().should('include', 'https://www.saucedemo.com/inventory.html');
    cy.get('.app_logo').should('be.visible');
    cy.get('.bm-burger-button').should('be.visible');
    cy.get('.svg-inline--fa').should('be.visible');
    cy.get('.header_secondary_container').should('be.visible');
    cy.get('.footer').should('be.visible');
    cy.get('.inventory_item').should('have.length','6');
})

//2. Adding top three items, all of their buttons should change to "remove", the cart item number on the page will be shown 3, then click the cart icon, three items should be in the cart with 1 qulity for each of them. 
//PLEASE NOTE: Auto re-run in the browser will break the test
it('adding to cart should change button and shown in the cart',()=>{
    
    cy.get('button').contains('REMOVE').should('not.be.exist');
    for(let n = 0; n < 3; n ++){
        cy.get('.inventory_list').find('button').eq(n).click();
    }
    cy.get('button:contains("REMOVE")').should('have.length','3');
    cy.get('.fa-layers-counter').should('be.visible').should('have.text','3');
})

//3. Click drop down menu and select price high to low, "Sauce Labs Fleece Jacket" should be on the top
it('Drop down menu will change the item order',()=>{
    cy.get('select').select('Price (high to low)')
    cy.get('.inventory_item').eq(0).should('contain','Sauce Labs Fleece Jacket');
}) 

//4. Clicking shopping cart should nevagate to the cart page
it('cart icon should nevagate to the cart page', ()=> {
    cy.get('#shopping_cart_container').click();
    cy.url().should('include', 'https://www.saucedemo.com/cart.html');
})
})