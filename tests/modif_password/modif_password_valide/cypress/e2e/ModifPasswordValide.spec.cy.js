describe('Modif password valide', () => {
  it('I m on the plateform', () => {
    cy.visit('http://localhost:3000')
  })

  it('I connect on the plateform', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('nZit11031994')
    cy.xpath('//button[@type="submit"]').click()
  })

  it('I redirected on edit password page', () => {
    cy.wait(9000)
    cy.xpath('//a[@href="/profil"]').click()
    cy.wait(7000)
    cy.xpath('//button[@data-cy="profile-change-password-button"]').click()
  })

  it('I fill the fields', () => {
    cy.xpath('//input[@data-cy="current-password"]').type('nZit11031994@')
    cy.xpath('//input[@data-cy="new-password"]').type('testTest011@')
    cy.xpath('//input[@data-cy="confirm-password"]').type('testTest011@')
  })

  it('I validate', () => {
    cy.xpath('//button[@data-cy="change-password-button"]').click()
  })
})