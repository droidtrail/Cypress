/// <reference types = "cypress" />

describe('Deve fazer teste a nível funcional',()=>{
    let token

    before(()=>{
        cy.getToken('leandro.nares@gmail.com','123')
            .then(tkn=>{
                token = tkn
            })   
    })

    beforeEach(()=>{
        cy.resetRest()
    })

    it('Deve criar uma conta',()=>{
        cy.getContaByName('Conta para movimentacoes')
        cy.request({ 
            url:'/contas',
            method:'POST',
            headers:{Authorization:`JWT ${token}`},
            body:{nome: "Conta via rest"}
        }).as('response')
        
        cy.get('@response').then(res=>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome','Conta via rest')
        })
    })

    it('Deve alterar conta',()=>{
        cy.getContaByName('Conta para alterar')
            .then(conta_id => {
                cy.request({
                    method:'PUT',
                    url:`/contas/${conta_id}`,
                    headers:{Authorization:`JWT ${token}`},
                    body:{nome:'conta alterada via rest'}
            }).as('response')

        cy.get('@response').its('status').should('be.equal', 200)

        })
          
    })
        
    it('Não deve criar uma conta com o mesmo nome',()=>{
           cy.request({ 
             url:'/contas',
             method:'POST',
             headers:{Authorization:`JWT ${token}`},
             body:{nome: "Conta mesmo nome"},
             failOnStatusCode: false
            }).as('response')
            
            cy.get('@response').then(res=>{
                expect(res.status).to.be.equal(400)
                expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
            })
        })
        
    it('Deve criar uma transação',()=>{
        //Busca pelo nome da conta
        cy.getContaByName('Conta para movimentacoes')
        .then(contId => {
            cy.request({ 
                url:'/transacoes',
                method:'POST',
                headers:{Authorization:`JWT ${token}`},
                body:{
                  tipo: "REC",
                  data_transacao:Cypress.moment().add({day: 0}).format('DD/MM/YYYY'),
                  data_pagamento:Cypress.moment().format('DD/MM/YYYY'),
                  descricao:"des",
                  valor:"10000",
                  envolvido:"CCC",
                  conta_id:contId,
                  status: true},
                }).as('response')
                cy.get('@response').its('status').should('be.equal',201)
                cy.get('@response').its('body.id').should('exist')
            })
        })
        
        it('Deve pegar o saldo',()=>{
        
        })

        it('Deve remover uma movimentação',()=>{
            
            
        })
    })