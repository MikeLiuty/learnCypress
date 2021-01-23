context('Actions', () => {
    it('number of items should able to be added and cleared',()=>{
        cy.addToCart('2');
        cy.clearCart();
    })
    it('cart icon should nevagate to the cart page', ()=> {
        cy.xpath('//div[@id="shopping_cart_container"]').click();
        cy.url().should('include', 'https://www.saucedemo.com/cart.html');
    })
})