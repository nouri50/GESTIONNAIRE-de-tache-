describe('Connexion users not linked account', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I redirected on the connexion page', () => {
    cy.xpath('//a[@href="/login"]').click()
  })

  it('I fill the fields', () => {
    cy.xpath('//input[@type="email"]').type('test@test.test')
    cy.xpath('//input[@type="password"]').type('testTest099@')
  })

  it('I validate the connexion', () => {
    cy.xpath('//button[@type="submit"]').click()
  })

  it('I receive an error message', () => {
    cy.wait(9000)
    cy.get('p').should('be.visible')
  })
})