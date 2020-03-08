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

    it.only('Deve alterar conta',()=>{
        cy.request({

            method:'GET',
            url:'/contas',
            headers:{Authorization:`JWT ${token}`},
            qs:{nome:'Conta para alterar'}

        }).then(res => {
           cy.request({
               url:`https://barrigarest.wcaquino.me/contas/${res.body[0].id}`,
               method:'PUT',
               headers: {Authorization: `JWT ${token}` },
               body:{
                   nome:'Conta alterada via rest'
                }
           }).as('response')

        })
           cy.get('@response').its('status').should('be.equal',200)
    })
        
    it('Não deve criar uma conta com o mesmo nome',()=>{
        
    })

    it('Deve criar uma transação',()=>{
        
    })

    it('Deve pegar o saldo',()=>{
        
    })

    it('Deve remover uma movimentação',()=>{
        
        
    })
})