import "./commands";

export class CartPage{
    
    removeFromCart(cartItems){
      for(let n = 0; n < cartItems; n ++){
        cy.get('.cart_item').find('button').eq(n).click();
    }
      }

    clickContinueButton(){
      cy.get('.cart_footer > .btn_secondary').click();
        cy.url().should('include', 'https://www.saucedemo.com/inventory.html');
    }

    clickCheckOutButton(){
      cy.get('.btn_action').click();
        cy.url().should('include', 'https://www.saucedemo.com/checkout-step-one.html');
    }
}

export const cartPage = new CartPage()