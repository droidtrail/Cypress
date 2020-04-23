/// <reference types = "cypress" />
describe('Mercury Home Page', () => {

    before(() => {
        cy.viewport(1000, 800)
        cy.visit('http://newtours.demoaut.com/index.php')

    })

    it('Login na Página', () => {

        cy.get('[type="text"]').type('JoaoPaulo')
        cy.get('[type="password"]').type('123')
        cy.get('[type="image"]').click()
    })

    it('Busca por Voos Ida e Volta', () => {

        //Flight Details
        cy.get('[name="passCount"]')
            .select('2')
            .should('have.value', '2')

        cy.get('[name="fromPort"]')
            .select('Seattle')
            .should('have.value', 'Seattle')

        cy.get('[name="fromMonth"]')
            .select('November')
            .should('have.value', '11')

        cy.get('[name="fromDay"]')
            .select('20')
            .should('have.have', '20')

        cy.get('[name="toPort"]')
            .select('Zurich')
            .should('have.value', 'Zurich')

        cy.get('[name="toMonth"]')
            .select('January')
            .should('have.value', '1')

        cy.get('[name="toDay"]')
            .select('20')
            .should('have.value', '20')

        //Preferences
        cy.get('[value="Coach"]')
            .should('be.checked')

        cy.get('[value="Business"]')
            .click()
            .should('be.checked')

        cy.get('[value="First"]')
            .should('not.be.checked')

        cy.get('[name="airline"]')
            .select('Unified Airlines')
            .should('have.value', 'Unified Airlines')

        cy.get('[type="image"]')
            .click()







    })


})