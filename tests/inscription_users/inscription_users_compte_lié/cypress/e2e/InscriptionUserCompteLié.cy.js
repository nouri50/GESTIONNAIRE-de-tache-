describe('Inscription user compte lié', () => {
  it('I am in the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I go to the registration page', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I create my new account', () => {
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
  })

  it('I validate my new account', () => {
    cy.xpath('//button[@type="submit"]').click()
  })

  it('I receive an error message', () => {
    cy.xpath('//div[@class="status-message"]').should('be.visible')
  })
})