describe('Add task input empty', () => {
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

  it('I redirected on the task management page', () => {
    cy.xpath('//a[@href="/tache"]').click()
  })

  it('I click on the add task button', () => {
    cy.xpath('//button[@data-cy="task-submit-button"]').click()
  })
})