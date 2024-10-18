describe('Click on the link create account', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I redirected on the connexion page', () => {
    cy.xpath('//a[@href="/login"]').click()
  })

  it('I click on the link', () => {
    cy.xpath('//a[@data-testid="signup-link"]').click()
  })

  it('I redirected on the registration page', () => {
    cy.xpath('//div[@class="signup-form-container"]').should('be.visible')
  })
})