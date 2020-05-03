


/// <reference types = "cypress" />

describe('Demo Automation', () => {

    beforeEach(() => {
        cy.viewport(1600, 800)
        cy.visit('http://automationpractice.com/index.php')

        cy.get('#search_query_top').type('dresses')
        cy.xpath("//button[@name='submit_search']").click()
        cy.get('#selectProductSort').select('Price: Lowest first')
        cy.get('#list').click()
        cy.scrollTo(0, 1500)
        cy.xpath("//a[@title='Faded Short Sleeve T-shirts']/img").click()
        cy.scrollTo(0, 200)
        cy.xpath("//button[@name='Submit']").click()

    })

    it('Adicionando produto ao carrinho', () => {

        cy.xpath("//h2[contains(.,'Product successfully added to your shopping cart')]").should('contain', 'Product successfully added to your shopping cart')
        cy.xpath("//span[@title='Close window']").click()

    })

    it('Verificando carrinho', () => {

        cy.xpath("//h2[contains(.,'Product successfully added to your shopping cart')]").should('contain', 'Product successfully added to your shopping cart')
        cy.xpath("//span[@title='Close window']").click()
        cy.xpath("//a[@title='View my shopping cart']").trigger('mouseover')
    })

    it('Comparando Produtos', () => {

        cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').trigger('mouseover')
    })

})