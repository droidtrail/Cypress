/// <reference types = "cypress" />

describe('Work with basic elements',()=>{

    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    
    beforeEach(()=>{
        cy.reload()
    })

    it('using jquery selector',() => {

        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3)>input')
        cy.get("[onclick*='Francisco']")
        cy.get('table#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input')
        cy.get('table#tabelaUsuarios tr:contains(\'Doutorado\'):eq(0) td:eq(6) input')

    })

    it('using xpath',()=>{
   
        cy.xpath('//input[contains(@onclick,\'Francisco\')]')
        cy.xpath("//table[@id='tabelaUsuarios']/tbody//td[contains(.,'Francisco')]/following-sibling::td/input")
        cy.xpath("//table[@id='tabelaUsuarios']/tbody//td[contains(.,'Francisco')]/..//input[@type='text']")
        cy.xpath("//*[@data-test='data2']")
        cy.xpath("//td[contains(.,'Usuario A')]/following-sibling::td[contains(.,'Mestrado')]/..//input[@type='text']").type('Funciona')
        //cy.xpath("//table[@id='tabelaUsuarios']/tbody//td[contains(.,'Doutorado')])[2]/..//input[@type='text']")
        //cy.xpath("//table[@id='tabelaUsuarios']/tbody//td[contains(.,'Doutorado')])[2]/..//input[@type='radio']")
        //cy.xpath("//table[@id='tabelaUsuarios']/tbody//td[contains(.,'Doutorado')])[2]/..//input[@type='checkbox']")
    })
})