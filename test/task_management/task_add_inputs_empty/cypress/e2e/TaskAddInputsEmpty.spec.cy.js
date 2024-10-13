describe('Task add inputs empty', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I connect on the website', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
    cy.xpath('//button[@type="submit"]').click()
  })

  it('I redirected on the task management page', () => {
    cy.xpath('//a[@href="/tache"]').click()
  })

  it('I validate the task add', () => {
    cy.wait(5000)
    cy.get('[data-cy="task-submit-button"]').click({force: true})
  })
})