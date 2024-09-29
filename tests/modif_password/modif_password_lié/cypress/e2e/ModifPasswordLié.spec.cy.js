describe('Modif password lié', () => {
  it('I m on the plateform', () => {
    cy.visit('http://localhost:3000')
  })

  it('I connect on the plateform', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('testTest011@')
    cy.xpath('//button[@type="submit"]').click()
  })

  it('I redirected on the edit password page', () => {
    cy.wait(9000)
    cy.xpath('//a[@href="/profil"]').click()
    cy.get('[data-cy="profile-change-password-button"]').click()
  })

  it('I fill the fields', () => {
    cy.xpath('//input[@data-testid="current-password-input"]').type('testTest011@')
    cy.xpath('//input[@data-testid="new-password-input"]').type('testTest011@')
    cy.xpath('//input[@data-testid="confirm-password-input"]').type('testTest011@')
  })

  it('I validate my new password', () => {
    cy.wait(9000)
    cy.get('[data-testid="submit-button"]').click()
  })

  it('I receive an error message', () => {
    cy.xpath('//p[@data-testid="message"]').should('be.visible')
  })
})