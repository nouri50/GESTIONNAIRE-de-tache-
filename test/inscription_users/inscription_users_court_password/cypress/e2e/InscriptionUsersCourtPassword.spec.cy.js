describe('Inscription users court password', () => {
  it('I m on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I click on the button', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I fill the fields', () => {
    cy.xpath('//input[@data-testid="signup-email"]').type('test@test.test')
    cy.xpath('//input[@data-testid="signup-password"]').type('test')
  })

  it('I validate my registration', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
  })

  it('I receive an error message', () => {
    cy.xpath('//div[@data-testid="password-error"]').should('be.visible')
  })
})