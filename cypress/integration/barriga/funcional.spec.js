/// <reference types = "cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Deve fazer teste a nível funcional',()=>{

    before(()=>{
       //support/commands.js
       cy.login()
       cy.resetApp()
    })

    it.only('Deve criar uma conta',()=>{
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain','Conta inserida com sucesso!')
    })

    it('Deve alterar conta',()=>{
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain','Conta atualizada com sucesso!')   
    })
})