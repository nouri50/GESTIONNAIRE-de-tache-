describe('Users connected redirection', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I connect on the website', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
    cy.xpath('//button[@type="submit"]').click()
    cy.wait(5000)
  })

  it('I click on a option', () => {
    cy.xpath('//a[@href="/gestion-utilisateur"]').click()
  })

  it('I redirected on the page', () => {
    cy.xpath('//div[@class="container"]').should('be.visible')
  })
})