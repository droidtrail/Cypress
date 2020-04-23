/// <reference types = "cypress" />

describe('PHP Travels Site', ()=>{
    it('Home Page',()=>{
        cy.viewport(1600,1000)
        cy.visit('https://www.phptravels.net/home')
        cy.xpath("//div[@id='s2id_autogen1']").type('Rio de Janeiro')
        //cy.xpath("//span[@class='select2-match']").click
        // cy.xpath("//div[@class='select2-result-label']/..//li//div").click
        cy.xpath("//div[@class='select2-result-label']/span").click

        
    })
})