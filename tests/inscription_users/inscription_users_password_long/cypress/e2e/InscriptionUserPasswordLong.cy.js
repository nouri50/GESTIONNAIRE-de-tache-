describe('Inscription user password long', () => {
  it('I am in the website', () => {
    cy.visit('http://localhost:3000')
  })
  
  it('I go to the registration page', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I create my new account', () => {
    cy.xpath('//input[@placeholder="Email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('gdzgefqgfyqgeygefygeyfgeyfgegfeyrgfyegrygeyrgfyegryvfgeygygbcybgyr')
  })

  it('I validate my new account', () => {
    cy.xpath('//button[@type="submit"]').click()
  })

  it('I receive an error message', () => {
    cy.get('[data-testid="password-error"]').should('be.visible')
  })
})