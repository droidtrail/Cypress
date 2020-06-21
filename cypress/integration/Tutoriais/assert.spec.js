/// <reference types = "cypress" />

describe("Assertion",function()
{
    it("Implicit sub",function()
    {
        cy.visit("https://opensource-demo.orangehrmlive.com/")
        cy.xpath("//div[@id='content']//div[2]/span").should("have.attr","style","color:red; font-weight:bold; z-index:100;")
        //cy.xpath("//div[@id='content']//div[2]/span").should("contain.text", "Username")
    })
})