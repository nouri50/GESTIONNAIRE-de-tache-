describe('Inscription users invalid email', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I click on the button', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I fill my informations', () => {
    cy.xpath('//input[@data-testid="signup-email"]').type('test@')
    cy.xpath('//input[@data-testid="signup-password"]').type('testTest099@')
  })

  it('I validate', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
  })
})