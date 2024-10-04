describe('Modif password linked account', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I connect on the website', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
    cy.xpath('//button[@type="submit"]').click()
  })

  it('I redirected on the edit password page', () => {
    cy.wait(5000)
    cy.xpath('//a[@href="/profil"]').click()
    cy.xpath('//button[@data-cy="profile-change-password-button"]').click()
  })

  it('I fill the fields', () => {
    cy.xpath('//input[@data-cy="current-password-input"]').type('nZit11031994@')
    cy.xpath('//input[@data-cy="new-password-input"]').type('nZit11031994@')
    cy.xpath('//input[@data-cy="confirm-password-input"]').type('nZit11031994@')
    cy.xpath('//button[@data-cy="submit-password-button"]').click()
  })

  it('I receive an error message', () => {
    cy.xpath('//p[@data-cy="change-password-error"]').should('be.visible')
  })
})