context ('Actions', () =>{
    it('Wait the button appear',() => {
        cy.visit('dynamic-properties')
        cy.get('#visibleAfter').should('be.visible');
    })

    it('Wait the button appear - by using timeout',() => {
        cy.visit('dynamic-properties')
        cy.get('#visibleAfter',{timeout:60000}).should('be.visible',);
    })

    it('Wait the button appear - by using wait',() => {
        cy.visit('dynamic-properties')
        cy.wait (6000)
        cy.get('#visibleAfter',{timeout:60000}).should('be.visible',);
    })
})

context ('Actions', () =>{
    it.only('Data should be correct', ()=>{
        cy.visit('automation-practice-form')
        cy.fixture('profile').then(profileData =>{
            cy.get('#firstName')
            .clear()
            .type(profileData.profile_info.firstName);
            cy.get('#lastName')
            .clear()
            .type(profileData.profile_info.lastName);
            cy.get('#userEmail')
            .clear()
            .type(profileData.profile_info.Email);
            cy.get('div').contains(JSON.stringify(profileData.profile_info.Gender).replace(/\"/g, "")).click({force: true})
            cy.get('#userNumber')
            .clear()
            .type(profileData.profile_info.Mobile);
            //I noticed the above steps can be implement by using keyboard as well. 
            cy.get('#state').click()
            //cy.get('.css-26l3qy-menu').contains('NCR').click()
            cy.get('.css-26l3qy-menu').contains(JSON.stringify(profileData.profile_info.State).replace(/\"/g, "")).click() 
            cy.get('#city').click()
            cy.get('.css-26l3qy-menu').contains(JSON.stringify(profileData.profile_info.City).replace(/\"/g, "")).click()
            cy.get('#submit').click()

            cy.get('tbody tr').eq(0)
                .should('contain','Student Name')
                .should('contain',JSON.stringify(profileData.profile_info.firstName).replace(/\"/g, ""))
                .should('contain',JSON.stringify(profileData.profile_info.lastName).replace(/\"/g, ""))
            
            cy.get('tbody tr').eq(1)
                .should('contain','Student Email')
                .should('contain',JSON.stringify(profileData.profile_info.Email).replace(/\"/g, ""))

            cy.get('tbody tr').eq(2)
                .should('contain','Gender')
                .should('contain',JSON.stringify(profileData.profile_info.Gender).replace(/\"/g, ""))

            cy.get('tbody tr').eq(3)
                .should('contain','Mobile')
                .should('contain',JSON.stringify(profileData.profile_info.Mobile).replace(/\"/g, ""))

            cy.get('tbody tr').eq(9)
                .should('contain','State and City')
                .should('contain',JSON.stringify(profileData.profile_info.State).replace(/\"/g, ""))
                .should('contain',JSON.stringify(profileData.profile_info.City).replace(/\"/g, ""))

            cy.get('#closeLargeModal').click()
        })
    })
})