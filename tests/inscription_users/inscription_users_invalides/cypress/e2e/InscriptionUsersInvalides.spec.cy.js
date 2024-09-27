describe('Inscription users invalides', () => {
  it('I m in the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I m redirected on the registration page', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I fill my informations in the fields', () => {
    cy.xpath('//input[@placeholder="Email"]').type('nzito066@')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('testTESTdzfuzf234@')
  })

  it('I validate my registration', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
  })

})