context('API calls',()=>{
    var id
    //I commented those because Chrome always remember my crendentials and it may ask me 2-step verification if I logout everytime
    // before(()=>{
    //     cy.visit('https://login.bigcommerce.com/login')
    //     cy.get('#user_email').type('***')
    //     cy.get('#user_password').type('***')
    //     cy.get('.login-form-button').click()
    // })
    it('Order through API should able to create a awaiting fulfillment order',()=>{
        cy.request({
            url: 'https://api.bigcommerce.com/stores/501g9td3ze/v2/orders',
            method: 'POST',
            headers: {
              "X-Auth-Token": '28kbvjt5vag1un1b223m3meb7hx17zw',
              "Content-Type": "application/json",
              "Accept": "application/json"
            
            },
            body:{
                "billing_address": {
                    "first_name": "Jane",
                    "last_name": "Doe",
                    "street_1": "123 Main Street",
                    "city": "Austin",
                    "state": "Texas",
                    "zip": "78751",
                    "country": "United States",
                    "country_iso2": "US",
                    "email": "janedoe@email.com"
                  },
                  "products": [
                    {
                      "name": "Test Item",
                      "quantity": 1,
                      "price_inc_tax": 50,
                      "price_ex_tax": 45
                    }
                  ],
                  "status_id": 11
            }
        }).then((res)=>{
            id = res.body.id
            cy.log(id)
        })
    })

    it('Order should able to be modified on UI',()=>{
        cy.visit('https://login.bigcommerce.com/login')
        cy.get('orders-menu').click()
        cy.wait(3000)
        getIframeBody().find('[data-id=6]').should('contain', 'Awaiting Fulfillment').click()
        getIframeBody().find('select:contains("Awaiting Fulfillment")').eq(1).select('Completed')
    })
    it('Awaiting Fulfillment should able to be completed through API',()=>{
        cy.request({
            url: 'https://api.bigcommerce.com/stores/501g9td3ze/v2/orders/'+id,
            method: 'GET',
            headers: {
              "X-Auth-Token": '28kbvjt5vag1un1b223m3meb7hx17zw',
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
        }).then((res)=>{
            expect(res.body.status_id).equal(10)
        })
    })
})

const getIframeDocument = () => {
    return cy.get('#content-iframe').its('0.contentDocument').should('exist')
  }

const getIframeBody = () => {
    return getIframeDocument().its('body').should('not.be.undefined').then(cy.wrap)
  }