/// <reference types = "cypress" />

describe('Should test at a funcional level',()=>{

    before(()=>{
        cy.visit('http://barrigareact.wcaquino.me/')
        cy.get('.input-group > .form-control').type('leandro.nares@gmail.com')
        cy.get(':nth-child(2) > .form-control').type('123')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain','Bem vindo,')
    })

    it('...',()=>{

        

    })

})