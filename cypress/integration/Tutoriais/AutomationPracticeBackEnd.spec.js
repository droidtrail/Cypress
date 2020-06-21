/// <reference types = "cypress" />

describe('Automation', () => {

    // before(() => {
        
    //     cy.visit('http://automationpractice.com/index.php')
    // })

    it('Login Inválido', () => {

        cy.request({
            method: 'GET',
            url:'http://automationpractice.com/index.php?controller=authentication&back=my-account',
            body:{
                email: 'xpto@gmail.com',
                passwd: '12345'
            }
        })
 
    })

    it('Login Válido', () => {
         
    })

    it('Adicionando Produto ao Carrinho', () => {
        

    })

    it('Verificando Carrinho', () => {
        
    })

    it('Excluindo Produto do Carrinho', () => {
       
    })

    it('Contate-Nos', () => {
       
    })

    it('Up Load de Arquivo', () => {
      
    })
})