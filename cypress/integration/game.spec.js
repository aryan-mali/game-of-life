describe('Game Page', () => { 
    it("loads successfully", () => {
        cy.visit('/')
        cy.get(".Board").should("exist")
        cy.get(".controls").should("exist")
    });

    it("speed changes successfully", () => {
        cy.visit('/')

        /* ==== Generated with Cypress Studio ==== */
        cy.get('.controls').click();
        cy.get('[value="100"]').clear().type('500')
        cy.get('[value="500"]')
        /* ==== End Cypress Studio ==== */
    })

    it("iterations changes successfully", () => {
        cy.visit('/')

        /* ==== Generated with Cypress Studio ==== */
        cy.get('.controls').click();
        cy.get('[value="10"]').clear().type('25')
        cy.get('[value="25"]')
        /* ==== End Cypress Studio ==== */
    })
 });