describe('Inscription user valide', () => {
  it('I m on the site', () => {
    cy.visit('http://localhost:3000')
  })

  it('I go to the registration page', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I create a new account', () => {
    cy.xpath('//input[@placeholder="Email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('nZit11031994@')
  })

  it('I validate', () => {
    cy.xpath('//button[@type="submit"]').click()
    cy.visit('http://localhost:3000/login')
  })
})