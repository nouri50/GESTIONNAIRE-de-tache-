describe('Modif password court', () => {
  it('I am on the plateform', () => {
    cy.visit('http://localhost:3000')
  })

  it('I connect on the plateform', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
    cy.xpath('//button[@type="submit"]').click()
  })

  it('I edit my password', () => {
    cy.get(':nth-child(4) > a').click() 
    cy.xpath('//button[normalize-space()="Modifier le mot de passe"]', { timeout: 50000 }).click()
    cy.wait(9000)
  })

  it('I fill the fields', () => {
    cy.xpath('//div[@class="change-password-page"]').type('nZit11031994@')
    cy.xpath('//input[@data-cy="new-password"]').type('test')
    cy.xpath('//input[@data-cy="confirm-password"]').type('test')
  })

  it('I validate my new password', () => {
    cy.xpath('//button[normalize-space()="Changer le mot de passe"]').click()
  })

  it('I receive an error message', () => {
    cy.xpath('//p[@class="message"]').should('be.visible')
  })
})