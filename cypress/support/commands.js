Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (name, lastname) => {
      cy.get('#firstName').click().type(name)
      cy.get('#lastName').click().type(lastname)
      cy.get('#email').click().type('brunoteste@gmail.com')
      cy.get('#phone').click().type('16 996241597')

      cy.get('#open-text-area').click().type('Teste')

      cy.get('button[type="submit"]').click()
      cy.get('.success').should('be.visible')
})

Cypress.Commands.add('verifyButton',() => {
    cy.contains('.button', 'Enviar')
})