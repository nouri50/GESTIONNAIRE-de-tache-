describe('Modif password long', () => {
  it('I m on the plateform', () => {
    cy.visit('http://localhost:3000')
  })

  it('I m connect on the website', () => {
    cy.xpath('//a[normalize-space()="Connexion"]').click()
    cy.xpath('//input[@placeholder="Email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('nZit11031994@')
    cy.xpath('//button[@type="submit"]').click()
  })

  it('I m redirected on the profil page', () => {
    cy.xpath('//a[normalize-space()="Profil"]').click()
  })

  it('I m redirected on the edit password page', () => {
    cy.get('.change-password-btn').click()
  })

  it('I edit my password with a password long', () => {
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
    cy.xpath('//div[@class="change-password-page"]//div[1]//input[1]').type('testTest07dzefgdzygfygzeygfcyzgfyzgyfgefzczgyzgefyzgyzgq@')
    cy.xpath('//div[3]//input[1]').type('testTest07dzefgdzygfygzeygfcyzgfyzgyfgefzczgyzgefyzgyzgq@')
  })

  it('I validate my new password', () => {
    cy.xpath('//button[normalize-space()="Changer le mot de passe"]').click()
    cy.xpath('//p[@class="message"]').should('be.visible')
  })
})