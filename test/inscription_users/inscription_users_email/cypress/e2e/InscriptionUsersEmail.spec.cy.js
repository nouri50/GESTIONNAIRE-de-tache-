describe('Inscription users email', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I click on the button', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I fill my email', () => {
    cy.xpath('//input[@data-testid="signup-email"]').type('test@test.test')
  })

  it('I validate', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
  })
})