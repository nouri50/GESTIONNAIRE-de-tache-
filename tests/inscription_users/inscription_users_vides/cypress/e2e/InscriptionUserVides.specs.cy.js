describe('Inscription user vides', () => {
  it('I am in the website', () => {
    cy.visit('http://localhost:3000')
  })

  it('I go to the page of registration', () => {
    cy.xpath('//button[@class="start-button"]').click()
  })

  it('I validate the registration', () => {
    cy.xpath('//button[@type="submit"]').click()
  })
})