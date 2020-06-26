describe('Orange Live', function () {
    before(() => {
        //importing the son file and saving to an alias name
        cy.fixture('OrangeLive.json').as('dados')
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.viewport(1400, 800)
    })
    it('Add Employee', function () {
        const loadData = this.dados
        cy.get(loadData).each((objects) => {
            
            cy.get('#txtUsername').type(objects.usuario)
            cy.get('#txtPassword').type(objects.senha)
            cy.get('#btnLogin').click()
            cy.get('#menu_pim_viewPimModule > b').click()
            cy.get('#menu_pim_addEmployee').click({force: true})
            cy.get('#firstName').type(objects.firstname)
            cy.get('#middleName').type(objects.middlename)
            cy.get('#lastName').type(objects.lastname)
            const filePath = 'UpLoad.jpg';
            cy.get('#photofile').attachFile(filePath)
            cy.get('#chkLogin').click()
            cy.get('#user_name').type(objects.username)
            cy.get('#user_password').type(objects.password)
            cy.get('#re_password').type(objects.confirmpassword)
            cy.get('#btnSave').click()
        })
    })
})