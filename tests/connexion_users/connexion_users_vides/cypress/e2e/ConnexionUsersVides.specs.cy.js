describe('Connexion users vides', () => {
  it('I m in the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I redirected in the connexion page', () => {
    cy.xpath('//button[@class="login-button"]').click()
  })

  it('I validate the connexion', () => {
    cy.xpath('//button[@data-testid="login-button"]').click()
  })
})