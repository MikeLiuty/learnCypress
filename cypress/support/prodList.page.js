export class ProdctPage{
    
    addToCart(itemsNum){
        for(let n = 0; n < itemsNum; n ++){
            cy.get('.inventory_list').find('button:contains("ADD TO CART")').eq(n).click();
        }
//       cy.get('button:contains("REMOVE")').should('have.length',itemsNum);
//        cy.get('.fa-layers-counter').should('be.visible').should('have.text',itemsNum);  
      }

    clickCartIcon(){
        cy.xpath('//div[@id="shopping_cart_container"]').click();
        cy.url().should('include', 'https://www.saucedemo.com/cart.html');
    }
}

export const prodctPage = new ProdctPage()