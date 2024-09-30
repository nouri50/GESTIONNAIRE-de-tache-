describe('Connexion users password', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I redirected on the connexion page', () => {
    cy.xpath('//a[@href="/login"]').click()
  })

  it('I fill my password', () => {
    cy.xpath('//input[@type="password"]').type('testTest011@')
  })

  it('I validate', () => {
    cy.xpath('//button[@type="submit"]').click()
  })
})