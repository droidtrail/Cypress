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

    it('Deve testar responsividade',()=>{
        cy.get('[data-test=menu-home]').should('exist')
            .and('be.visible')

        cy.viewport(500,700)
        cy.get('[data-test=menu-home]').should('exist')
            .and('be.not.visible')

        cy.viewport('iphone-5')
        cy.get('[data-test=menu-home]').should('exist')
            .and('be.not.visible')

        cy.viewport('ipad-2')
        cy.get('[data-test=menu-home]').should('exist')
            .and('be.visible')
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

    it('Não deve criar uma conta com o mesmo nome',()=>{
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
        cy.route({
            method:'POST',
            url:'/transacoes',
            response: {
                tipo: "REC",
                data_transacao: "29/03/2020",
                data_pagamento: "29/03/2020",
                descricao: "Descrição",
                valor: "12345.00",
                envolvido: "Daniele Cordeiro",
                conta_id: "91005",
                status: false
            },    
        }).as('Criar Transação')

        cy.route({
            method:'GET',
            url:'/extrato/**',
            response: 'fixture:movimentacaoSalva'
        }).as('Criar Transação')
       
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRIÇÃO).type('Descrição')
        cy.get(loc.MOVIMENTACAO.VALOR).type('12345.00')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Daniele Cordeiro')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
        cy.get(loc.MOVIMENTACAO.STATUS_PAGA).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOVIMENTACAO).click()
        cy.get(loc.MESSAGE).should('contain','Movimentação inserida com sucesso!')
        cy.get(loc.EXTRATO.LINHAS_TABELA_EXTRATO)
            .should('have.length',10)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc','123')).should('exist')
    })

    it('Deve pegar o saldo',()=>{

        cy.route({
            method:'GET',
            url:'/extrato/**',
            response: 'fixture:movimentacaoSalva'
        }).as('Obter Extrato')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira','1.500,00'))
        cy.get(loc.MENU.EXTRATO).click()

        cy.route({
            method:'GET',
            url:'/transacoes/**',
            response: {
                conta:"Conta para saldo",
                id:75547,
                descricao:"Movimentacao 1, calculo saldo",
                envolvido:"CCC",
                observacao:null,
                tipo:"REC",
                data_transacao:"2020-03-28T03:00:00.000Z",
                data_pagamento:"2020-03-28T03:00:00.000Z",
                valor:"3500.00",
                status:false,
                conta_id:91007,
                usuario_id:3839,
                transferencia_id:null,
                parcelamento_id:null
            }
        })

        cy.route({
            method:'PUT',
            url:'/transacoes/**',
            response: {
                conta:"Conta para saldo",
                id:75547,
                descricao:"Movimentacao 1, calculo saldo",
                envolvido:"CCC",
                observacao:null,
                tipo:"REC",
                data_transacao:"2020-03-28T03:00:00.000Z",
                data_pagamento:"2020-03-28T03:00:00.000Z",
                valor:"3500.00",
                status:false,
                conta_id:91007,
                usuario_id:3839,
                transferencia_id:null,
                parcelamento_id:null
            }
        })
        cy.xpath(loc.EXTRATO.FN_XP_EDITAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        // cy.wait(500)
        //Substituição do Wait
        cy.get(loc.MOVIMENTACAO.DESCRIÇÃO).should('have.value','Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS_PAGA).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOVIMENTACAO).click()
        cy.get(loc.MESSAGE).should('contain','Movimentação alterada com sucesso!')
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira','1.500,00'))
    })

    it('Deve remover uma movimentação',()=>{

        cy.route({
            method:'GET',
            url:'/extrato/**',
            response: 'fixture:movimentacaoSalva'
        }).as('Obter Extrato')

        cy.route({
            method:'DELETE',
            url:'/transacoes/**',
            response: {},
            status: 204
        }).as('Deletar')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain','sucesso')
        
    })

    it('Deve validar os dados pra criar um conta',()=>{ 
        cy.route({
            method:'POST',
            url:'/contas',
            response:
                {id:'05',nome:'Conta de teste',visivel:true,usuario_id:1}     
        }).as('Inserir Conta')

        cy.acessarMenuConta()
            
        cy.reqStub = cy.stub()
        
        cy.route({
            method:'GET',
            url:'/contas',
            //Funcionou!
            onRequest: req => {
                console.log(req)
                expect(req.request.body).to.be.null
                expect(req.request.headers).to.have.property('Authorization')
            },

           //onRequest:reqStub,

            response:[
                {id:'03',nome:'Carteira',visivel:true,usuario_id:1},
                {id:'04',nome:'Banco',visivel:true,usuario_id:1},
                {id:'05',nome:'Conta de teste',visivel:true,usuario_id:1}
            ]
            
        }).as('Obter Conta Inserida')
        cy.inserirConta('{CONTROL}')
        
        // cy.wait('@Obter Conta Inserida').then(()=>{
        //     console.log(reqStub.args[0][0])
        //     reqStub(req.request.body).to.be.null
        //     reqStub(req.request.headers).to.have.property('Authorization')
        // })
        //Não funcionou
        // cy.wait('@Obter Conta Inserida').its('request.body').should('not.be.empty')
        
        cy.get(loc.MESSAGE).should('contain','Conta inserida com sucesso!')
    })

    it('Deve testar as cores',()=>{
        cy.route({
            method: 'GET',
            url:'/extrato/**',
            response: [
                {   
                    "conta":"Conta para movimentacoes",
                    "id":"76194",
                    "descricao":"Receita paga",
                    "envolvido":"Inter",
                    "observacao":null,
                    "tipo":"REC",
                    "data_transacao":"2020-03-29T03:00:00.000Z",
                    "data_pagamento":"2020-03-29T03:00:00.000Z",
                    "valor":"123.00",
                    "status":true,
                    "conta_id":91005,
                    "usuario_id":3839,
                    "transferencia_id":null,
                    "parcelamento_id":null
                },
                {
                    "conta":"Teste",
                    "id":76244,
                    "descricao":"Receita pendente",
                    "envolvido":"Inter",
                    "observacao":null,
                    "tipo":"REC",
                    "data_transacao":"2020-03-29T03:00:00.000Z",
                    "data_pagamento":"2020-03-29T03:00:00.000Z",
                    "valor":"123.00",
                    "status":false,
                    "conta_id":91010,
                    "usuario_id":3839,
                    "transferencia_id":null,
                    "parcelamento_id":null
                },
                {
                    "conta":"Teste",
                    "id":76245,
                    "descricao":"Despesa paga",
                    "envolvido":"Inter",
                    "observacao":null,
                    "tipo":"DESP",
                    "data_transacao":"2020-03-29T03:00:00.000Z",
                    "data_pagamento":"2020-03-29T03:00:00.000Z",
                    "valor":"123.00",
                    "status":true,
                    "conta_id":91010,
                    "usuario_id":3839,
                    "transferencia_id":null,
                    "parcelamento_id":null
                },
                {
                    "conta":"Conta com movimentacao",
                    "id":75546,
                    "descricao":"Despesa pendente",
                    "envolvido":"BBB",
                    "observacao":null,
                    "tipo":"DESP",
                    "data_transacao":"2020-03-28T03:00:00.000Z",
                    "data_pagamento":"2020-03-28T03:00:00.000Z",
                    "valor":"-1500.00",
                    "status":false,
                    "conta_id":91006,
                    "usuario_id":3839,
                    "transferencia_id":null,
                    "parcelamento_id":null
                },
            ]
        })
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class', 'receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita pendente')).should('have.class','receitaPendente')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa paga')).should('have.class', 'despesaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa pendente')).should('have.class','despesaPendente')
    })

    
})