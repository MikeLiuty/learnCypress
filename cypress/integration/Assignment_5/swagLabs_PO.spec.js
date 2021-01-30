import { loginPage} from '../../support/login.page'
import { prodctPage} from '../../support/prodList.page'
import { cartPage} from '../../support/cart.page'

describe('Page object practice',()=>{
    context('user should able to login',()=>{
        beforeEach(function(){
            loginPage.visit()
            loginPage.login()
        })

        it('Item should able to be added to the cart',()=>{
            prodctPage.addToCart(2)
            prodctPage.clickCartIcon()
        })

        it('Item should able to be removed from the cart',()=>{
            prodctPage.clickCartIcon()
            cartPage.removeFromCart(1)
            cartPage.clickContinueButton()
        })

        it('Items should able to be added again',()=>{
            prodctPage.addToCart(1)
            prodctPage.clickCartIcon()
        })

        it('cart should able to be checked out',()=>{
            prodctPage.clickCartIcon()
            cartPage.clickCheckOutButton()
        })
    })
})