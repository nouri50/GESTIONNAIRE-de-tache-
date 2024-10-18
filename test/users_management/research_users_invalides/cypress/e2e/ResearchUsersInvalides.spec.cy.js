describe('Research users invalides', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I connect on the website', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@data-testid="login-email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@data-testid="login-password"]').type('nZit11031994@')
    cy.xpath('//button[@data-testid="login-submit"]').click()
    cy.wait(5000)
  })

  it('I redirected on the users management page', () => {
    cy.xpath('//a[@href="/gestion-utilisateur"]').click()
  })

  it('I research a user', () => {
    cy.xpath('//input[@data-testid="search-bar"]').type('test@csdcysgdfygs.test')
  })

  it('I receive an error message', () => {
    cy.xpath('//td[@class="no-results"]').should('be.visible')
  })
})