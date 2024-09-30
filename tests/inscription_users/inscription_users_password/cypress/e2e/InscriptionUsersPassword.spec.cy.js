describe('Inscription users password', () => {
  it('I am on the plateform', () => {
    cy.visit('http://localhost:3000')
  })

  it('I m redirected on the registration page', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I fill my password on the fields', () => {
    cy.xpath('//input[@data-testid="signup-password"]').type('testTest099@')
  })

  it('I validate my registration', () => {
    cy.wait(9000)
    cy.xpath('//button[@data-testid="signup-submit"]').click({force: true})
  })
})