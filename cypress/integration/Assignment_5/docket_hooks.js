before(function(){
    cy.request({
        url: 'https://docket-test.herokuapp.com/api/Todo',
        method: 'GET',
        headers: {
          "token": '0a3bb339-0515-47f8-9caf-0c9bde3d38f3'
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
                    "token": '0a3bb339-0515-47f8-9caf-0c9bde3d38f3'
                  }                
            })
          })

        })
})