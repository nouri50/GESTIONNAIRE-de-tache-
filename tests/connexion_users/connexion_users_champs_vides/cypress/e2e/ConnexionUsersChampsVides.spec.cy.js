describe('Connexion users champs vides', () => {
  it('I m on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I redirected on the login page', () => {
    cy.xpath('//a[normalize-space()="Connexion"]').click()
  })

  it('I try to connect', () => {
    cy.xpath('//button[normalize-space()="Connexion"]').click()
  })
})