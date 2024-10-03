describe('Connexion users fields empty', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I redirected on the connexion page', () => {
    cy.xpath('//a[@href="/login"]').click()
  })

  it('I validate the connexion', () => {
    cy.xpath('//button[@type="submit"]').click()
  })
})