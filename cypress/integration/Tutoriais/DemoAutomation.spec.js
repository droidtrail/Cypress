/// <reference types = "cypress" />

describe('Demo Automation', () => {

    before(() => {
        cy.viewport(1400, 1000)
        cy.visit('http://demo.automationtesting.in/Index.html')

    })

    it('Login',()=>{
        cy.get('#email').type('xpto@gmail.com')
        cy.get('#enterimg').click() 
    })

    it('Register',()=>{
        cy.xpath("//input[@placeholder='First Name']").type('Carlos')
        cy.xpath("//input[@placeholder='Last Name']").type('Castro')
        cy.xpath("//textarea[@ng-model='Adress']").type('5th Avenue')
        cy.xpath("//input[@ng-model='EmailAdress']").type('xpto3@gmail.com')
        cy.xpath("//input[@ng-model='Phone']").type('1123456789')
        cy.xpath("//input[@value='Male']").click()
        cy.get('#checkbox1').click()
        cy.get('#checkbox3').click()
        cy.get('#Skills').select('Javascript')
        cy.get('#countries').select('Brazil')
        cy.get('#yearbox').select('2000')
        cy.xpath("//select[@placeholder='Month']").select('April')
        cy.get('#daybox').select('5')
        cy.get('#firstpassword').type('X12345x')
        cy.get('#secondpassword').type('X12345x') 
        cy.get('#submitbtn').click()
        cy.xpath("//i[@class='icon-ok']").should('contain','Product successfully added to your shopping cart') 
        
    })

})