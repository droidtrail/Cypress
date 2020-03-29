/// <reference types = "cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Deve fazer teste a nível funcional',()=>{

    before(()=>{
       cy.server()
       //Rota de Login
       cy.route({
           method:'POST',
           url:'/signin',
           response:{
            id:3839,
            nome:'UsuarioFalso',
            token:'Uma string muito grande que não deveria ser aceita, mas vai'
           }
       }).as('Login')
       
       cy.route({
           method:'GET',
           url:'/saldo',
           response:[{
                conta_id:'999',
                conta:'Carteira',
                saldo:'1500.00'
           },
           {
                conta_id:'9909',
                conta:'Banco',
                saldo:'1000000.00'
           },
           ]
       }).as('Saldo')
       cy.login('leandro.nares@gmail.com','senhaErrada')
       //cy.resetApp()
    })

    beforeEach(()=>{
        cy.get(loc.MENU.HOME).click()
        // cy.resetApp()
    })

    after(()=>{
        cy.clearLocalStorage()
    })

    it.skip('Deve criar uma conta',()=>{
        cy.route({
            method:'GET',
            url:'/contas',
            response:[
                {id:'03',nome:'Carteira',visivel:true,usuario_id:1},
                {id:'04',nome:'Banco',visivel:true,usuario_id:1},
            ]
        }).as('Obter Contas')

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
        cy.server()
        cy.route({
            method:'GET',
            url:'/contas',
            response:[
                {id:'03',nome:'Carteira',visivel:true,usuario_id:1},
                {id:'04',nome:'Banco',visivel:true,usuario_id:1},
            ]
        }).as('Obter Conta')

        cy.route({
            method:'PUT',
            url:'/contas/**',
            response:
                {id:'03',nome:'Conta Alterada',visivel:true,usuario_id:1},   
            }).as('Inserir Conta Alterada')

        cy.route({
            method:'GET',
            url:'/contas',
            response:[
                {id:'03',nome:'Conta Alterada',visivel:true,usuario_id:1},
                {id:'04',nome:'Banco',visivel:true,usuario_id:1},
                ]
            }).as('Obter Conta Alterada')

        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Banco')).click()
        cy.get(loc.CONTAS.NOME)
              .clear()
              .type('Conta Alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click({force:true})
        cy.get(loc.MESSAGE).should('contain','Conta atualizada com sucesso')
          
    })

    it.skip('Não deve criar uma conta com o mesmo nome',()=>{
        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click({force:true})
        cy.get(loc.MESSAGE).should('contain','status code 400')
    })

    it.skip('Deve criar uma transação',()=>{
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

    it.skip('Deve pegar o saldo',()=>{
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

    it.skip('Deve remover uma movimentação',()=>{
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain','Movimentação inserida com sucesso!')
        
    })
})