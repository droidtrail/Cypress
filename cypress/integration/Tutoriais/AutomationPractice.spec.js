/// <reference types = "cypress" />

describe('Automation', () => {

    before(() => {
        cy.viewport(1280, 720)
        cy.visit('http://automationpractice.com/index.php')
    })

    it('Login Inválido', () => {

        cy.get('.login').click()
        cy.get('#email').scrollIntoView({ duration: 1500 }).type('xpto@gmail.com')
        cy.get('#passwd').scrollIntoView({ duration: 1500 }).type('1')
        cy.get('#SubmitLogin').scrollIntoView({ duration: 1500 }).click()
        cy.xpath("//div[@class='alert alert-danger']").should('contain', 'There is 1 error')
    })

    it('Login Válido', () => {
        
        cy.get('#email').scrollIntoView({ duration: 1500 }).clear().type('xpto@gmail.com')
        cy.get('#passwd').scrollIntoView({ duration: 1500 }).clear().type('12345')
        cy.get('#SubmitLogin').scrollIntoView({ duration: 1500 }).click()
        cy.xpath("//span[contains(.,'carlos Antonio')]").scrollIntoView({ duration: 1500 }).should('contain', 'carlos Antonio')
       
    })

    it('Adicionando Produto ao Carrinho', () => {
        cy.get('#search_query_top').scrollIntoView({ duration: 1500 }).type('dresses')
        cy.xpath("//button[@name='submit_search']").scrollIntoView({ duration: 1500 }).click()
        cy.get('#selectProductSort').scrollIntoView({ duration: 1500 }).select('Price: Lowest first')
        cy.get('#list').scrollIntoView({ duration: 1500 }).click()
        cy.xpath("//a[@title='Faded Short Sleeve T-shirts']/img").scrollIntoView({ duration: 1500 }).click()
        cy.xpath("//button[@name='Submit']").scrollIntoView({ duration: 1500 }).click()
        cy.xpath("//h2[contains(.,'Product successfully added to your shopping cart')]").scrollIntoView({ duration: 1500 }).should('contain', 'Product successfully added to your shopping cart')
        cy.xpath("//span[@title='Close window']").scrollIntoView({ duration: 1500 }).click()
        cy.wait(2000)

    })

    it('Verificando Carrinho', () => {
        cy.xpath("//span[@title='Close window']").scrollIntoView({ duration: 1500 }).click({force: true})
        cy.xpath("//a[@title='View my shopping cart']").scrollIntoView({ duration: 1500 }).trigger('mouseover')
    })

    it('Excluindo Produto do Carrinho', () => {
        cy.xpath("//a[@title='View my shopping cart']").scrollIntoView({ duration: 1500 }).trigger('mouseover')
        cy.xpath("//span[@class='remove_link']").scrollIntoView({ duration: 1500 }).click()
        //cy.get('#contact-link')
    })

    it('Contate-Nos', () => {
        cy.get('#contact-link').scrollIntoView({ duration: 1500 }).click()
        cy.get('#id_contact').scrollIntoView({ duration: 1500 }).select('Webmaster')
        cy.get('#email').scrollIntoView({ duration: 1500 }).type('xpto@gmail.com')
        cy.get('#message').scrollIntoView({ duration: 1500 }).type('Teste de automação com o Cypress.')
        cy.get('#submitMessage').scrollIntoView({ duration: 1500 }).click()
        cy.xpath("//p [@class='alert alert-success']").scrollIntoView({ duration: 1500 }).should('contain', 'Your message has been successfully sent to our team.')
    })

    it('Up Load de Arquivo', () => {
        cy.get('#contact-link').scrollIntoView({ duration: 1500 }).click()
        cy.get('#id_contact').scrollIntoView({ duration: 1500 }).select('Webmaster')
        cy.get('#email').scrollIntoView({ duration: 1500 }).type('xpto@gmail.com')
        cy.get('#message').scrollIntoView({ duration: 1500 }).type('Up Load de arquivo com Cypress.')
        const filePath = 'UpLoad.jpg';
        cy.get('#fileUpload').scrollIntoView({ duration: 1500 }).attachFile(filePath)
        cy.get('#submitMessage').scrollIntoView({ duration: 1500 }).click()
        cy.xpath("//p [@class='alert alert-success']").scrollIntoView({ duration: 1500 }).should('contain', 'Your message has been successfully sent to our team.')
    })
})