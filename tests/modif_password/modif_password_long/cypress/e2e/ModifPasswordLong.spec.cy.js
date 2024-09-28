describe('Modif password long', () => {
  it('I m on the plateform', () => {
    cy.visit('http://localhost:3000')
  })

  it('I connect on the plateform', () => {
    cy.xpath('//a[normalize-space()="Connexion"]').click()
    cy.xpath('//input[@placeholder="Email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('nZit11031994@')
    cy.xpath('//button[normalize-space()="Connexion"]').click()
  })

  it('I redirected on the edit password page', () => {
    cy.xpath('//a[normalize-space()="Profil"]').click()
    cy.get('.change-password-btn', { timeout: 10000 }).click()
  })

  it('I edit my password', () => {
    cy.xpath('//div[@class="change-password-page"]').type('nZit11031994@')
    cy.xpath('//input[@type="password"]').type('jxhsdugzqydxgzyegdfyzegyhusashazudhuazdhyzegfygzebfzyegfyebgfyegfycegyfuo@')
    cy.xpath('//*[@id="root"]').type('jxhsdugzqydxgzyegdfyzegyhusashazudhuazdhyzegfygzebfzyegfyebgfyegfycegyfuo@')
  })

  it('I confirm the new password', () => {
    cy.xpath('//button[normalize-space()="Changer le mot de passe"]').click()
  })

  it('I receive an error message', () => {
    cy.xpath('//p[@class="message"]').should('be.visible')
  })
})