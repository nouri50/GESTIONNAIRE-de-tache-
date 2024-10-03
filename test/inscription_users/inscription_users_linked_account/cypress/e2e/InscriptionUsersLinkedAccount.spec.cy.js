describe('Inscription users linked account', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I click on the button', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I fill the fields', () => {
    cy.xpath('//input[@data-testid="signup-email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@data-testid="signup-password"]').type('nZit11031994@')
  })

  it('I validate', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
  })

  it('I receive an error message', () => {
    cy.xpath('//div[@data-testid="status-message"]').should('be.visible')
  })
})