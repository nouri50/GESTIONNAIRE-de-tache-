describe('Delete account admin password invalide', () => {
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
    cy.xpath('//img[@data-testid="delete-icon-user-4"]').click()
  })

  it('I fill the input with a invalid password', () => {
    cy.xpath('//input[@data-testid="admin-password-input"]').type('nZit110394@')
    cy.xpath('//button[@data-testid="confirm-delete-button"]').click()
  })

  it('I receive an error message', () => {
    cy.xpath('//p[@data-testid="error-message"]').should('be.visible')
  })
})