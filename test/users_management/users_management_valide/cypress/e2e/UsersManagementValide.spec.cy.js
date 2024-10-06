describe('Users management valide', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I create a new account', () => {
    cy.xpath('//button[@class="start-button"]').click()
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
    cy.xpath('//button[@type="submit"]').click()
  })

  it('I redirected on the users management', () => {
    cy.xpath('//a[@href="/gestion-utilisateur"]').click()
  })

  it('I see all users data', () => {
    cy.xpath('//div[@class="user-management-page"]').should('be.visible')
  })
})