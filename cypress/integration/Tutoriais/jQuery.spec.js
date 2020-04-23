/// <reference types = "cypress" />
describe('JQuery',()=>{

    // before(()=>{
    //     cy.viewport(1000,600)
    // })

    it.only('Draggable: Default Functionality',()=>{
        cy.visit('https://jqueryui.com/draggable/')

        cy.get('.demo-frame').then(iframe =>{
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#draggable')
                .should('contain','Drag me around')
                .trigger('mousedown',{which:1 ,pageX:100, pageY:100})
                .trigger('mousemove',{which:1 ,pageX:200, pageY:200})
                .trigger('mouseup')
                       
        })
    })

    it('Draggable: jQuery UI Draggable + Sortable',()=>{

        cy.visit('https://jqueryui.com/draggable/#sortable')

        cy.get('.demo-frame').then(iframe =>{
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#draggable')
                .should('contain','Drag me around')
                .trigger('mousedown',{which:1 ,pageX:300, pageY:100})
                .trigger('mousemove',{which:1 ,pageX:500, pageY:200})
                .trigger('mouseup')
                       
         })
    })

})