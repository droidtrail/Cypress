describe('DemoAutomationDataDriven', function () {
    before(() => {
        //importing the son file and saving to an alias name
        cy.fixture('DemoAutomationData.json').as('dados')
        cy.visit('http://demo.automationtesting.in/Index.html')
    })
    it('Login', function () {
        const loadData = this.dados
        cy.get(loadData).each((objects) => {
            cy.get('#email').type(objects.email)
            cy.get('#enterimg').click()

            cy.xpath("//input[@placeholder='First Name']").type(objects.FirstName)
            cy.xpath("//input[@placeholder='Last Name']").type(objects.LastName)
            cy.xpath("//textarea[@ng-model='Adress']").type(objects.Adress)
            cy.xpath("//input[@ng-model='EmailAdress']").type(objects.EmailAdress)
            cy.xpath("//input[@ng-model='Phone']").type(objects.Phone)
            cy.xpath("//input[@value='Male']").click()
            cy.get('#checkbox1').click()
            cy.get('#checkbox3').click()
            cy.get('#Skills').select('Javascript')
            cy.get('#countries').select('Brazil')
            cy.get('#yearbox').select('2000')
            cy.xpath("//select[@placeholder='Month']").select('April')
            cy.get('#daybox').select('5')
            cy.get('#firstpassword').type(objects.firstpassword)
            cy.get('#secondpassword').type(objects.secondpassword)
            cy.get('#submitbtn').click()
        })
    })
})