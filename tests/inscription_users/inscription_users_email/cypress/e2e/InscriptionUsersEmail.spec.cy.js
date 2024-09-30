describe('Inscription users email', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I redirected on the registration page', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I fill my email address on the fields', () => {
    cy.xpath('//input[@data-testid="signup-email"]').type('test@test.test')
  })

  it('I validate my registration', () => {
    cy.wait(9000)
    cy.xpath('//button[@data-testid="signup-submit"]').click({force: true})
  })
})