describe('Connexion users email', () => {
  it('I m on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I rdirected on the connexion page', () => {
    cy.xpath('//a[@href="/login"]').click()
  })

  it('I fill my email address on the fields', () => {
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
  })

  it('', () => {
    cy.xpath('//button[@type="submit"]').click()
  })
})