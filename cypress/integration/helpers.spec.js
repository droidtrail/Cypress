/// <reference types = "cypress" />



describe('Helpers...',()=>{
    it('Wrap',()=>{
        
       const obj = {nome: 'User', Idade: 20}
       expect(obj).to.have.property('nome')
       cy.wrap(obj).should('have.property','nome')

       
       cy.visit('https://wcaquino.me/cypress/componentes.html')
      
      //cy.get('#formNome').then($el =>{
      //cy.wrap($el).type('Funciona via Cypress')

           const promise = new Promise((resolve, reject)=>{
               setTimeout(()=>{
                   resolve(10)
               },500)
           })
            cy.get('#buttonSimple').then(()=> console.log('Encontrei o primeiro botão'))
            //promise.then(num => console.log(num))
            cy.wrap(promise).then(ret => console.log(ret))
            cy.get('#buttonList').then(()=> console.log('Encontrei o segundo botão'))
       
           cy.wrap(1).then(run => {
               return 2
           }).should('be.equal',2)
        })
    })