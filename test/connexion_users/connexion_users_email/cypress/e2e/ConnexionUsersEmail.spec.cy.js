describe('Connexion users email', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I redirected on the connexion page', () => {
    cy.xpath('//a[@href="/login"]').click()
  })

  it('I fill my email address on the field', () => {
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
  })

  it('I validate the connexion', () => {
    cy.xpath('//button[@type="submit"]').click()
  })
})