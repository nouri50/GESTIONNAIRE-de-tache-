describe('Delete account admin password valide', () => {
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

  it('I click on the delete user button', () => {
    cy.xpath('//img[@data-testid="delete-icon-user-5"').click()
  })

  it('I fill the input with my admin password', () => {
    cy.xpath('//input[@data-testid="admin-password-input"]').type('nZit11031994@')
  })

  it('I click on the validation button', () => {
    cy.xpath('//button[@data-testid="confirm-delete-button"]').click()
  })

  it('I receive a success message', () => {
    cy.xpath('//p[@data-testid="success-message"]').should('be.visible')
  })
})