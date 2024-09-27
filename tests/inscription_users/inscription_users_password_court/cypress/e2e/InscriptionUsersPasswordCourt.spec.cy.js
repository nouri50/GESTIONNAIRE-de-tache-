describe('Inscription users password court', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })

  it('I redirected in the registration page', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I fill the informations', () => {
    cy.xpath('//input[@placeholder="Email"]').type('nzito077@icloud.com')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('test')
  })

  it('I validate', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
  })

  it('I receive an error message', () => {
    cy.xpath('//div[@class="error-message"]').should('be.visible')
  })
})