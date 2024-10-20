describe('Cancel delete users account', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I connect on the website', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@data-testid="login-email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@data-testid="login-password"]').type('nZit11031994@')
    cy.xpath('//button[@data-testid="login-submit"]').click()
    cy.wait(5000)
  })

  it('I redirected on the users management page', () => {
    cy.xpath('//a[@href="/gestion-utilisateur"]').click()
  })

  it('I click on the delete account button', () => {
    cy.xpath('//img[@data-testid="delete-icon-user-2"]').click()
  })

  it('I click on the cancel button', () => {
    cy.xpath('//button[@data-testid="cancel-delete-button"]').click()
  })

  it('I see the users list', () => {
    cy.xpath('//table[@data-testid="user-table"]').should('be.visible')
  })
})