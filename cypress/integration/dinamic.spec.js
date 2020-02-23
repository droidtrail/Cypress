/// <reference types = "cypress" />

describe('Dinamic tests',()=>{

    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    //Array para busca pelo Label
    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    foods.forEach(food => {

        it(`Cadastro com a comida ${food}`,()=>{

            cy.get('#formNome').type('Leandro')
            cy.get('#formSobrenome').type('Santos')
            cy.get(`[name=formSexo][value=F]`).click()
            cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain',"Cadastrado!")
        
            })
    })

})