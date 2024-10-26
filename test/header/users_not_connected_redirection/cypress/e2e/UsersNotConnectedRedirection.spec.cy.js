describe('Users not connected redirection', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I selected a option', () => {
    cy.xpath('//a[@href="/gestion-utilisateur"]').click()
  })

  it('I redirected on the connexion page', () => {
    cy.xpath('//div[@class="login-container"]').should('be.visible')
  })
})