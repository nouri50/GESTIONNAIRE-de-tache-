describe('Connexion users compte non lié', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I click on the button', () => {
    cy.xpath('//button[@class="login-button"]').click()
  })

  it('I fill the informations', () => {
    cy.xpath('//input[@data-testid="email-input"]').type('test1@test.com')
    cy.xpath('//input[@data-testid="password-input"]').type('testTest090909@')
  })

  it('I validate the connexion', () => {
    cy.xpath('//button[@data-testid="login-button"]').click()
  })

  it('I receive an error message', () => {
    cy.xpath('//div[@data-testid="login-error"]').should('be.visible')
  })
})