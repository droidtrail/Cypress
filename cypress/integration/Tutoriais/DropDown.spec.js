/// <reference types = "cypress" />

describe('Dropdowns', () => {

    it('Usando select', () => {

        cy.viewport(1300, 900)
        cy.visit('https://www.facebook.com/')

        cy.get('#day')
            .select('30')
            .should('have.value', '30')

        cy.get('#month')
            .select('12')
            .should('have.value', '12')

        cy.get('#year')
            .select('2000')
            .should('have.value', '2000')
    })

    it.only('Sem usar Select', () => {
        cy.viewport(1300, 900)
        cy.visit('https://www.phptravels.net/')

        cy.get('#dropdownLangauge').click()
        cy.xpath("//div[@aria-labelledby='dropdownLangauge']/div").each(($el) => {
            var lan = $el.text()
            if(lan==' Arabic') {
                cy.wrap($el).click()
            }
        })
    })
})