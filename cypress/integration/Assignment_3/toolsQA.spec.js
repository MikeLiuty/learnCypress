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
            cy.get('input[value="Female"]').click({force: true})
            cy.get('#userNumber')
            .clear()
            .type(profileData.profile_info.Mobile);
//            cy.get('#stateCity-wrapper').contains('NCR').click()
        })
    })
})