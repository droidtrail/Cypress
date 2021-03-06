/// <reference types = "cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Deve fazer teste a nível funcional',()=>{

    before(()=>{
       //support/commands.js
       cy.login('leandro.nares@gmail.com','123')
       cy.resetApp()
    })

    beforeEach(()=>{
        cy.get(loc.MENU.HOME).click()
        cy.resetApp()
    })

    it('Deve criar uma conta',()=>{
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain','Conta inserida com sucesso!')
    })

    it('Deve alterar conta',()=>{
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click({force:true})
        cy.get(loc.MESSAGE).should('contain','Conta inserida com sucesso!')   
    })

    it('Não deve criar uma conta com o mesmo nome',()=>{
        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click({force:true})
        cy.get(loc.MESSAGE).should('contain','status code 400')
    })

    it.only('Deve criar uma transação',()=>{
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRIÇÃO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS_PAGA).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOVIMENTACAO).click()
        cy.get(loc.MESSAGE).should('contain','sucesso!')
        cy.get(loc.EXTRATO.LINHAS_TABELA_EXTRATO).should('have.length',7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc','123')).should('exist')
    })

    it('Deve pegar o saldo',()=>{
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo','534'))
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_EDITAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        // cy.wait(500)
        //Substituição do Wait
        cy.get(loc.MOVIMENTACAO.DESCRIÇÃO).should('have.value','Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS_PAGA).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOVIMENTACAO).click()
        cy.get(loc.MESSAGE).should('contain','Movimentação alterada com sucesso!')
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo','4.034,00'))
    })

    it('Deve remover uma movimentação',()=>{
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain','sucesso!')
        
    })
})