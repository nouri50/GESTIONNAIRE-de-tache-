describe('Connexion users linked account', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I redirected on the connexion page', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.visit('http://localhost:3000/login')
  })

  it('I fill the fields', () => {
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
  })

  it('I validate the connexion', () => {
    cy.xpath('//button[@type="submit"]').click()
  })

  it('I redirected on the personal page', () => {
    cy.visit('http://localhost:3000/home')
  })
})