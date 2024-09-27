describe('Connexion users compte lié', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I click on the button', () => {
    cy.xpath('//button[@class="login-button"]').click()
  })

  it('I m connect on the website', () => {
    cy.xpath('//input[@data-testid="email-input"]').type('nzito055@icloud.com')
    cy.xpath('//input[@data-testid="password-input"]').type('nZit11031994@')
  })

  it('I validate my connexion', () => {
    cy.xpath('//button[@data-testid="login-button"]').click()
  })

  it('I redirected on the other page', () => {
    cy.visit('http://localhost:3000/home')
  })
})