describe('Inscription user invalide', () => {
  it('I am in the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I am in the registration page', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I create a new account', () => {
    cy.xpath('//input[@placeholder="Email"]').type('nzito055@')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('nZit11031994@')
  })

  it('I validate my new account on the website', () => {
    cy.xpath('//button[@type="submit"]').click()
  })
})