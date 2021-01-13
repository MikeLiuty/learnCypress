/*
Test cases: 
    1. Check all the elements are there
    2. Standard user should able to login
    3. Locked out user should not able to login - Check the message
    4. Problem user should able to login
    5. Performance glich user should able to login
    6. Standard user with wrong password
    7. Standard user with the password without lowdash
    8. Standard user with the username without lowdash
    9. Space before the standard user username
    10. space after the standard user username
    11. Check if api saved the username and password? 
    12. Empty username and Empty password- check message
    13. Empty username but password- check message
    14. Empty password but username- check message
*/

context('Actions', ()=> {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })
})