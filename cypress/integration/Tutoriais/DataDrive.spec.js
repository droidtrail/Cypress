describe('DemoAutomationDataDriven', function () {
    before(() => {
        //importing the son file and saving to an alias name
        cy.fixture('DemoAutomationData.json').as('dados')
        cy.visit('http://demo.automationtesting.in/Index.html')
    })
    it('Login', function () {
        const loadData = this.dados
        cy.get(loadData).each((loginObject) => {
            cy.get('#email').type(loginObject.email)
            cy.get('#enterimg').click()
            
        })
    })

    it('Register', function () {
        const loadData = this.dados
        cy.get(loadData).each((registerObject) => {
            
        cy.xpath("//input[@placeholder='First Name']").type(registerObject.FirstName)
        cy.xpath("//input[@placeholder='Last Name']").type(registerObject.LastName)
        cy.xpath("//textarea[@ng-model='Adress']").type(registerObject.Adress)
        cy.xpath("//input[@ng-model='EmailAdress']").type(registerObject.EmailAdress)
        cy.xpath("//input[@ng-model='Phone']").type(registerObject.Phone)
        cy.xpath("//input[@value='Male']").click()
        cy.get('#checkbox1').click()
        cy.get('#checkbox3').click()
        cy.get('#Skills').select('Javascript')
        cy.get('#countries').select('Brazil')
        cy.get('#yearbox').select('2000')
        cy.xpath("//select[@placeholder='Month']").select('April')
        cy.get('#daybox').select('5')
        cy.get('#firstpassword').type(registerObject.firstpassword)
        cy.get('#secondpassword').type(registerObject.secondpassword) 
        cy.get('#submitbtn').click()
        })
    })

})