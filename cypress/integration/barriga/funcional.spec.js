/// <reference types = "cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Deve fazer teste a nível funcional',()=>{

    before(()=>{
       //support/commands.js
       cy.login()
       cy.resetApp()
    })

    it('Deve criar uma conta',()=>{
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
        cy.get(loc.CONTAS.BTN_SALVAR).click({force:true})
        cy.get(loc.MESSAGE).should('contain','Conta inserida com sucesso!')   
    })

    it('Não deve criar uma conta com o mesmo nome',()=>{
        cy.acessarMenuConta()
        cy.inserirConta('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click({force:true})
        cy.get(loc.MESSAGE).should('contain','status code 400')
    })

    it('Deve criar uma transação',()=>{
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRIÇÃO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOVIMENTACAO).click()
        cy.get(loc.MESSAGE).should('contain','Movimentação inserida com sucesso!')
        cy.get(loc.EXTRATO.LINHAS_TABELA_EXTRATO).should('have.length',7)
        cy.xpath(loc.EXTRATO.XP_BUSCA_ELEMENTO).should('exist')
    })
})