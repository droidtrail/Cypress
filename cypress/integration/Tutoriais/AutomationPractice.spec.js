/// <reference types = "cypress" />

describe('Automation', () => {

    before(() => {
        cy.viewport(1280, 720)
        cy.visit('http://automationpractice.com/index.php')
    })

    it('Login Inválido', () => {

        cy.get('.login').click()
        cy.get('#email')
        cy.get('#email').type('xpto@gmail.com')
        cy.get('#passwd').type('1')
        cy.get('#SubmitLogin').click()
        cy.xpath("//div[@class='alert alert-danger']").should('contain', 'There is 1 error')
    })

    it('Login Válido', () => {
        
        cy.get('#email').clear().type('xpto@gmail.com')
        cy.get('#passwd').clear().type('12345')
        cy.get('#SubmitLogin').click()
        cy.xpath("//span[contains(.,'carlos Antonio')]").should('contain', 'carlos Antonio')
        cy.get('.account > span')
    })

    it('Adicionando Produto ao Carrinho', () => {
        cy.get('#search_query_top').type('dresses')
        cy.xpath("//button[@name='submit_search']").click()
        cy.get('#selectProductSort').select('Price: Lowest first')
        cy.get('#list').click()
        cy.xpath("//a[@title='Faded Short Sleeve T-shirts']/img").click()
        cy.xpath("//button[@name='Submit']").click()
        cy.xpath("//h2[contains(.,'Product successfully added to your shopping cart')]").should('contain', 'Product successfully added to your shopping cart')
        cy.xpath("//span[@title='Close window']").click()

    })

    it('Verificando Carrinho', () => {
        cy.xpath("//span[@title='Close window']").click({force: true})
        cy.xpath("//a[@title='View my shopping cart']").trigger('mouseover')
    })

    it('Excluindo Produto do Carrinho', () => {
        cy.xpath("//a[@title='View my shopping cart']").trigger('mouseover')
        cy.xpath("//span[@class='remove_link']").click()
        cy.get('#contact-link')
    })

    it('Contate-Nos', () => {
        cy.get('#contact-link').click()
        cy.get('#id_contact').select('Webmaster')
        cy.get('#email').type('xpto@gmail.com')
        cy.get('#message').type('Teste de automação com o Cypress.')
        cy.get('#submitMessage').click()
        cy.xpath("//p [@class='alert alert-success']").should('contain', 'Your message has been successfully sent to our team.')
    })

    it('Up Load de Arquivo', () => {
        cy.get('#contact-link').click()
        cy.get('#id_contact').select('Webmaster')
        cy.get('#email').type('xpto@gmail.com')
        cy.get('#message').type('Up Load de arquivo com Cypress.')
        const filePath = 'UpLoad.jpg';
        cy.get('#fileUpload').attachFile(filePath)
        cy.get('#submitMessage').click()
        cy.xpath("//p [@class='alert alert-success']").should('contain', 'Your message has been successfully sent to our team.')
    })
})