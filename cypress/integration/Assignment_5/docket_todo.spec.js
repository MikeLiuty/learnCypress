import './docket_hooks'

context('Actions', () => {
    it('should able to post one item', ()=> {
      const message = "test item 1"
        cy.request({
            method: 'POST',
            url: 'https://docket-test.herokuapp.com/api/Todo/',
            body: {"Body": message},
            headers: {
              "token": 'a8371e03-4e5a-45c3-8903-47633d7301a3'
            }
    })
  })
    it('verify data #1',()=>{
      cy.request({
        url: 'https://docket-test.herokuapp.com/api/Todo',
        method: 'GET',
        headers: {
          "token": 'a8371e03-4e5a-45c3-8903-47633d7301a3'
        }
    }).then((res)=>{
      expect(res.status).equal(200)
      Array.from(res.body).forEach(item => {
          expect(JSON.stringify(item.body)).equal(message)
      })
        })
    })
})