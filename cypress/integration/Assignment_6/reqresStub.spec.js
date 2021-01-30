before(()=>{
    cy.request('GET', 'https://reqres.in/api/users/2').then((Response)=>{
        if(expect(Response.body.data).not.be.null){
            cy.request('DELETE', 'https://reqres.in/api/users/2').then((Response)=>{
                expect(Response.status).equal(204)
            })
        }
    })
})

context('stub practices',()=>{
    it('stub should works for creating and updating',()=>{
        //Post a new user
        const user = 
            {
                name: "morpheus",
                job: "leader",
            }
        
        cy.request('POST','https://reqres.in/api/users/',user).then((Response)=>{
            expect(Response.status).equal(201)
            expect(Response.body.name).equal(user.name)
            expect(Response.body.job).equal(user.job)
        })

        //get the user
        cy.intercept({
            method: 'GET',
            url: 'https://reqres.in/api/users/2',
        times:1},
            {statusCode: 200,
            body: {
                name: "morpheus",
                job: "leader",
            }
          }).as('mockUser')
        cy.visit('https://reqres.in/#support-heading')
        cy.get('[data-id="users-single"]').click()
        cy.wait('@mockUser').should(({response }) => {
            expect(response.body.name).equal('morpheus')
            expect(response.body.job).equal('leader')
          })

        //patch the user name
        const updatedUser = 
        {
            name: "Mike",
            job: "leader",
        }

        cy.request('PATCH','https://reqres.in/api/users/2',updatedUser).then((Response)=>{
            expect(Response.status).equal(200)
            expect(Response.body.name).equal(updatedUser.name)
            expect(Response.body.job).equal(updatedUser.job)
        })

        //get the updated user (unable to overwrite intercept)
        cy.intercept({
            method: 'GET',
            url: 'https://reqres.in/api/users/2',
            times:1
        },
            {statusCode: 200,
            body: {
                name: "Mike",
                job: "leader",
            }
            }).as('updatedMockUser')
        // cy.reload()
        cy.get('[data-id="users-single"]').click({force:true})
        cy.wait('@updatedMockUser').should(({response }) => {
            expect(response.body.name).equal('Mike')
            expect(response.body.job).equal('leader')
            })
    })
})