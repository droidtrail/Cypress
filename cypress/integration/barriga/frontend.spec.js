/// <reference types = "cypress" />

import loc from '../../support/locators'
import buildEnv from '../../support/buildEnv'
import '../../support/commandsContas'

describe('Deve fazer teste a nível funcional',()=>{

    beforeEach(()=>{
       buildEnv()
       cy.login('leandro.nares@gmail.com','senhaErrada')
       cy.get(loc.MENU.HOME).click()   
    })

    after(()=>{
        cy.clearLocalStorage()
    })

    it('Deve criar uma conta',()=>{ 
        cy.route({
            method:'POST',
            url:'/contas',
            response:
                {id:'05',nome:'Conta de teste',visivel:true,usuario_id:1}     
        }).as('Inserir Conta')

        cy.acessarMenuConta()
            cy.route({
            method:'GET',
            url:'/contas',
            response:[
                {id:'03',nome:'Carteira',visivel:true,usuario_id:1},
                {id:'04',nome:'Banco',visivel:true,usuario_id:1},
                {id:'05',nome:'Conta de teste',visivel:true,usuario_id:1}
            ]
        }).as('Obter Conta Inserida')

        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain','Conta inserida com sucesso!')
    })

    it('Deve alterar conta',()=>{
        
        cy.route({
            method:'PUT',
            url:'/contas/**',
            response:

                {id:'03',nome:'Conta Alterada',visivel:true,usuario_id:1},   
            
            }).as('Inserir Conta Alterada')

        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Banco')).click()
        cy.get(loc.CONTAS.NOME)
              .clear()
              .type('Conta Alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click({force:true})
        cy.get(loc.MESSAGE).should('contain','Conta atualizada com sucesso')
          
    })

    it.only('Não deve criar uma conta com o mesmo nome',()=>{
        cy.route({
            method:'POST',
            url:'/contas',
            response: {"error":"Já existe uma conta com esse nome!"},
            status: 400   
        }).as('Conta Duplicada')
        
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste')
        cy.get(loc.CONTAS.BTN_SALVAR).click({force:true})
        cy.get(loc.MESSAGE).should('contain','status code 400')
    })

    it('Deve criar uma transação',()=>{
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRIÇÃO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS_PAGA).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOVIMENTACAO).click()
        cy.get(loc.MESSAGE).should('contain','Movimentação inserida com sucesso!')
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
        cy.get(loc.MESSAGE).should('contain','Movimentação inserida com sucesso!')
        
    })
})