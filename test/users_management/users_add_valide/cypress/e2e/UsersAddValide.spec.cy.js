describe('Users add valide', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I click on the start button', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I registrate a new account', () => {
    cy.xpath('//input[@data-testid="signup-email"]').type('test@test.test')
    cy.xpath('//input[@data-testid="signup-password"]').type('testTest001@')
    cy.xpath('//button[@data-testid="signup-submit"]').click()
  })

  it('I connect on the website with my account', () => {
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
    cy.xpaht('//button[@type="submit"]').click()
  })

  it('I redirected on the user manage page', () => {
    cy.xpath('').click()
  })
})