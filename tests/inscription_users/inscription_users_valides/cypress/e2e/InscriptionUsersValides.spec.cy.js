describe('Inscription users valides', () => {
  it('I m in the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I click on the button', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I fill in the fields', () => {
    cy.xpath('//input[@placeholder="Email"]').type('test@test.test')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('testTest01020304@')
  })

  it('I validate my registration', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
  })

  it('I redirected on the page of connexion', () => {
    cy.visit('http://localhost:3000/login')
  })
})