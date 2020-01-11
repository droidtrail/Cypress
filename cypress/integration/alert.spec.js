/// <reference types = "cypress" />

describe('Work with alerts',()=>{

    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    
    beforeEach(()=>{
        cy.reload()
    })
    
    it('Alert',()=>{

        cy.get('#alert').click()
        cy.on('window:alert', msg =>{
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')
        })

    })

    it('Alertcom Mock',()=>{
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(()=>{
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
            
    })

    it('Confirm',() => {
        cy.on('window:confirm', msg =>{
            expect(msg).to.be.equal('Confirm Simples')
        })
        Cypress.on('window:alert', msg =>{
            expect(msg).to.be.equal('Confirmado')
        })
        cy.get('#confirm').click()
    })
    it('Deny',() => {
        cy.on('window:confirm', msg =>{
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })
        Cypress.on('window:alert', msg =>{
            expect(msg).to.be.equal('Negado')
        })
        cy.get('#confirm').click()
    })

    it('Prompt',() => {
        cy.window().then(win => {
            cy.stub(win,'prompt').returns('42')
        })
        
        cy.on('window:prompt', msg =>{
           expect(msg).to.be.equal('Era 42?')
        })

        Cypress.on('window:alert', msg =>{
           expect(msg).to.be.equal(':D')
       })
        cy.get('#prompt').click()
    })

    //35. Desafio: Validar mensagens
    it.only('Validando Mensagens',()=>{

        //Criando um Stub
        const stub = cy.stub().as('alerta')

        /*Quando o evento de WINDOW:ALERT for exibido, o Cypress pegará o evento (pelo cy.on)
        e atribuirá a constante (const) stub. Com isso conseguiremos manipular o Alert.
        */
       cy.on('window:alert',stub)

       /*Após o evento de Click, será feito uma assertiva (expect) no texto da 
       mensagem (Nome eh obrigatorio)*/
       cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

        //Preenchendo o nome, clicando no botão e fazendo a acertiva    
        cy.get('#formNome').type('Leandro')
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

        //Preenchendo o SobreNome, clicando no botão e fazendo a acertiva    
        cy.get('[data-cy=dataSobrenome]').type('Pereira')
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))

        cy.get('#formSexoMasc').click()    
        cy.get('#formCadastrar').click()
        })

})