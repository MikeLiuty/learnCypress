import './docket_hooks'

context('Actions', () => {
    it('add one item', ()=> {

        cy.request({
            method: 'POST',
            url: 'https://docket-test.herokuapp.com/api/Todo/',
            
            body: {"Body": "test item 1"},
            headers: {
              "token": '0a3bb339-0515-47f8-9caf-0c9bde3d38f3'
            }
    })
})
})