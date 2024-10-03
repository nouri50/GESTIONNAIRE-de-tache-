describe('Inscription users fields empty', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I redirected on the registration page', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I validate the registration', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
  })
})