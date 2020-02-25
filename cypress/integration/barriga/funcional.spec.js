/// <reference types = "cypress" />

describe('Deve fazer teste a nível funcional',()=>{

    before(()=>{
        cy.visit('http://barrigareact.wcaquino.me/')
        cy.get('.input-group > .form-control').type('leandro.nares@gmail.com')
        cy.get(':nth-child(2) > .form-control').type('123')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain','Bem vindo,')
    })

    it('Deve criar uma conta',()=>{

        cy.get('.dropdown-toggle').click()
        cy.get('[href="/contas"]').click()
        cy.get('.form-control').type('Conta de teste')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain','Conta inserida com sucesso!')

    })

})