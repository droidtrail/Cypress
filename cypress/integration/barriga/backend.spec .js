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
            body:{
                nome: "Conta via rest"
            }
        }).as('response')
        
        cy.get('@response').then(res=>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome','Conta via rest')
        })
    })

    it('Deve alterar conta',()=>{
           
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