describe('Cancel users management', () => {
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
    cy.wait(5000)
  })

  it('I click on the edit button', () => {
    cy.xpath('//img[@data-testid="edit-icon-user-1"]').click()
  })

  it('I click on the cancel button', () => {
    cy.xpath('//button[@data-testid="cancel-edit-button"]').click()
  })

  it('I redirected on the users list', () => {
    cy.visit('http://localhost:3000/gestion-utilisateur')
  })
})