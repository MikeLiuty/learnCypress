before(function(){
    cy.request({
        url: 'https://docket-test.herokuapp.com/api/Todo',
        method: 'GET',
        headers: {
          "token": 'a8371e03-4e5a-45c3-8903-47633d7301a3'
        }
    }).then((res)=>{
          cy.log(res.body)
          expect(res.status).equal(200)
         
          Array.from(res.body).forEach(item => {
            cy.log('received Json:' + JSON.stringify(item))
            cy.request({
                  url: 'https://docket-test.herokuapp.com/api/Todo/'+ item.id,
                  method: 'DELETE',
                  headers: {
                    "token": 'a8371e03-4e5a-45c3-8903-47633d7301a3'
                  }                
            })
          })
        })
})

after(function(){
  cy.request({
      url: 'https://docket-test.herokuapp.com/api/Todo',
      method: 'GET',
      headers: {
        "token": 'a8371e03-4e5a-45c3-8903-47633d7301a3'
      }
  }).then((res)=>{
        cy.log(res.body)
        expect(res.status).equal(200)
       
        Array.from(res.body).forEach(item => {
          cy.log('received Json:' + JSON.stringify(item))
          cy.request({
                url: 'https://docket-test.herokuapp.com/api/Todo/'+ item.id,
                method: 'DELETE',
                headers: {
                  "token": 'a8371e03-4e5a-45c3-8903-47633d7301a3'
                }                
          })
        })

      })
})