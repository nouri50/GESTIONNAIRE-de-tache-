describe('Connexion user valide', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I go to the connexion page', () => {
    cy.xpath('//button[@class="login-button"]').click()
  })

  it('I fill my id', () => {
    cy.xpath('//input[@placeholder="Email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('nZit11031994@')
  })

  it('I validate the connexion', () => {
    cy.xpath('//button[@data-testid="login-button"]').click()
  })

  it('I redirected on my personal page', () => {
    cy.visit('http://localhost:3000/home')
  })
})