context('Action',()=>{
    it('get a random number',()=>{
        cy.visit('https://www.calculator.net/random-number-generator.html?slower=1&supper=100&ctype=1&s=6516&submit1=Generate')

    cy.get('.verybigtext').should('be.visible').invoke('text').then(($val)=>{
        const text = $val
        text<50? cy.log('the value is less than 50'): cy.log('the value is greater than 50')
    })
    })   
})