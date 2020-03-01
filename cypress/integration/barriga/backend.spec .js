/// <reference types = "cypress" />

describe('Deve fazer teste a nível funcional',()=>{

    before(()=>{
         
    })

    beforeEach(()=>{
        
    })

    it('Deve criar uma conta',()=>{
        cy.request({

            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body:{
                email: "leandro.nares@gmail.com",
                senha: "123",
                redirecionar: false
            }
        }).its('body.token').should('not.be.empty')
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