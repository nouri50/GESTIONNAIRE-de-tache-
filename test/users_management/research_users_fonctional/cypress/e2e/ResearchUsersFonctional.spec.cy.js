describe('Research users fonctional', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I connect on the website', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@type="email"]').type('test@test.com')
    cy.xpath('//input[@type="password"]').type('testTest088@')
    cy.xpath('//button[@type="submit"]').click()
  })

  it('I redirected on the users management page', () => {
    cy.xpath('//a[@href="/gestion-utilisateur"]').click()
  })

  it('I research a user', () => {
    //cy.wait(9000)
    cy.xpath('//input[@placeholder="Rechercher"]').type('test@test.com', {force: true})
  })

  it('I see a user to display', () => {
    cy.xpath('//div[@class="user-management-page"]').should('be.visible')
  })
})