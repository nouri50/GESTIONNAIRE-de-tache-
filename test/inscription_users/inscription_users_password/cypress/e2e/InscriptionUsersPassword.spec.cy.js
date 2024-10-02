describe('Inscription users password', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I click on the button', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I fill my password', () => {
    cy.xpath('//input[@data-testid="signup-password"]').type('testTest099@')
  })

  it('I validate my new account', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
  })


})