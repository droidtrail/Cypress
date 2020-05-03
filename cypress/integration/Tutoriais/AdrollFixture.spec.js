/// <reference types = "cypress" />

describe('Fixtures', () => {

    before(() => {
        cy.viewport(1400, 800)
        cy.visit('https://www.adroll.com/')
    })

    it('Formulário de Cadastro', function() {

        cy.get(':nth-child(8) > .cta > span').click()

        cy.fixture('AdRoll').as('cadastro').then(() => {

            cy.get('#first_name').type(this.cadastro[1].FirstName)
            cy.get('#last_name').type(this.cadastro[1].LastName)
            cy.get('#email').type(this.cadastro[1].CompanyEmail)
            cy.get('#company_phone').type(this.cadastro[1].ComPhoNum)
            cy.get('#url').type(this.cadastro[1].CompWebSiteUrl) 
        })
      
    }) 
})