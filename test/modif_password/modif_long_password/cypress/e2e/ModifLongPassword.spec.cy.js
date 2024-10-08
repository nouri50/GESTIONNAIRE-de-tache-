describe('Modif long password', () => {
  it('I am on the plateform', () => {
    cy.visit('http://localhost:3000')
  })

  it('I connect to the plateform', () => {
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
    cy.xpath('//input[@data-cy="new-password-input"]').type('jxhsdugzqydxgzyegdfyzegyhusashazudhuazdhyzegfygzebfzyegfyebgfyegfycegyfuo@')
    cy.xpath('//input[@data-cy="confirm-password-input"]').type('jxhsdugzqydxgzyegdfyzegyhusashazudhuazdhyzegfygzebfzyegfyebgfyegfycegyfuo@')
  })

  it('I validate my new password', () => {
    cy.xpath('//button[@data-cy="submit-password-button"]').click()
    cy.xpath('//p[@data-cy="change-password-error"]').should('be.visible')
  })
})