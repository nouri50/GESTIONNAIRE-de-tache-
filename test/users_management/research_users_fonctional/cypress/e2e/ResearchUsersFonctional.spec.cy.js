describe('Research users fonctional', () => {
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

  it('I redirected on the users management page', () => {
    cy.get(':nth-child(4) > a').click()
  })

  it('I research an another user', () => {
    cy.xpath('//input[@data-cy="search-input"]').type('test@test.test')
  })

  it('I see a user on the users list', () => {
    cy.xpath('//div[@data-cy="user-management-page"]').should('be.visible')
  })
})