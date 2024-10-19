describe('Delete account user password valide', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I connect on the website', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@data-testid="login-email"]').type('test@test.test')
    cy.xpath('//input[@data-testid="login-password"]').type('testTest001@')
    cy.xpath('//button[@data-testid="login-submit"]').click()
    cy.wait(5000)
  })

  it('I redirected on the users management page', () => {
    cy.xpath('//a[@href="/gestion-utilisateur"]').click()
  })

  it('I click on the delete account button', () => {
    cy.xpath('//img[@data-testid="delete-icon-user-3"]').click()
  })

  it('I fill the input with a valide password', () => {
    cy.xpath('//input[@data-testid="admin-password-input"]').type('testTest01@')
    cy.xpath('//button[@data-testid="confirm-delete-button"]').click()
  })

  it('I receive an error message', () => {
    cy.xpath('//p[@data-testid="error-message"]').should('be.visible')
  })
})