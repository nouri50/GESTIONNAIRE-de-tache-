describe('Modif users management', () => {
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

  it('I click on the modifications', () => {
    cy.xpath('//img[@data-testid="edit-icon-user-1"]').click()
  })

  it('I modify my informations', () => {
    cy.xpath('//select[@data-testid="edit-role-select"]').select('admin')
    cy.xpath('//select[@data-testid="edit-status-select"]').select('active')
    cy.xpath('//button[@data-testid="confirm-edit-button"]').click()
  })

  it('I see the modifications on the table', () => {
    cy.xpath('//p[@data-testid="success-message"]').should('be.visible')
    cy.xpath('//td[@data-testid="user-role-1"]').should('be.visible')
    cy.xpath('//td[@data-testid="user-status-1"]').should('be.visible')
  })
})