describe('Connexion user invalide', () => {
  it('I am in the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I go to the connexion page', () => {
    cy.xpath('//button[@class="login-button"]').click()
  })

  it('I fill the id on the fields', () => {
    cy.xpath('//input[@placeholder="Email"]').type('test@test.test')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('testTest99@')
  })

  it('I validate the connexion', () => {
    cy.xpath('//button[@data-testid="login-button"]').click()
  })

  it('I receive an error message', () => {
    cy.xpath('//div[@data-testid="login-error"]').should('be.visible')
  })
})