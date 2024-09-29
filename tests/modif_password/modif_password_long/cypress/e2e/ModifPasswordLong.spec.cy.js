describe('Modif password long', () => {
  it('I am on the plateform', () => {
    cy.visit('http://localhost:3000')
  })

  it('I connect on the plateform', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
    cy.xpath('//button[@type="submit"]').click()
  })

  it('I redirected to other page', () => {
    cy.wait(9000)
    cy.xpath('//a[@href="/profil"]').click()
    cy.xpath('//button[@data-cy="profile-change-password-button"]').click()
  })

  it('I fill the fields', () => {
    cy.xpath('//input[@data-cy="current-password"]').type('nZit11031994@')
    cy.xpath('//input[@data-cy="new-password"]').type('jxhsdugzqydxgzyegdfyzegyhusashazudhuazdhyzegfygzebfzyegfyebgfyegfycegyfuo@')
    cy.xpath('//input[@data-cy="confirm-password"]').type('jxhsdugzqydxgzyegdfyzegyhusashazudhuazdhyzegfygzebfzyegfyebgfyegfycegyfuo@')
  })

  it('I validate my new password', () => {
    cy.xpath('//button[@data-cy="change-password-button"]').click()
  })

  it('I receive an error message', () => {
    cy.xpath('//p[@data-cy="change-password-message"]').should('be.visible')
  })
})
