/// <reference types = "cypress" />

describe('Fixtures', () => {

    before(() => {
        cy.viewport(1400, 800)
        cy.visit('https://www.adroll.com/')
    })

    it('Formulário de Cadastro', function() {

        cy.get(':nth-child(8) > .cta > span').click()

        cy.fixture('AdRoll').as('cadastro').then(() => {

            cy.get('#first_name').type(this.cadastro.FirstName)
            cy.get('#last_name').type(this.cadastro.LastName)
            cy.get('#email').type(this.cadastro.CompanyEmail)
            cy.get('#company_phone').type(this.cadastro.ComPhoNum)
            cy.get('#url').type(this.cadastro.CompWebSiteUrl) 
        })
      
    }) 
})