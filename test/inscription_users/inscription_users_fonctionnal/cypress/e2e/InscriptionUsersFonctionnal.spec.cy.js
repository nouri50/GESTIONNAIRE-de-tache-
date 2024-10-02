describe('Inscription users fonctionnal', () => {
  it('I am on the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I click on the button', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I fill my personal informations', () => {
    cy.xpath('//input[@data-testid="signup-email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@data-testid="signup-password"]').type('nZit11031994@')
  })

  it('I validate my new account', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
  }) 

  it('I redirected on the new page', () => {
    cy.visit('http://localhost:3000/login')
  })
})