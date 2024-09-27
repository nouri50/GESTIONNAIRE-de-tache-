import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I m in the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I click on the button start', () => {
    cy.xpath('//button[@class="start-button"]').click() 
})

When('I fill my id in the fields', () => {
    cy.xpath('//input[@placeholder="Email"]').type('nzito077@icloud.com')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('test') 
})

When('I validate my new account', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
})

Then('I receive an error message', () => {
    cy.xpath('//div[@class="error-message"]').should('be.visible')
})