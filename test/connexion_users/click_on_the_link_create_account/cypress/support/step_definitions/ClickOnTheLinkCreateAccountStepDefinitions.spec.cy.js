import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I redirected on the connexion page', () => {
    cy.xpath('//a[@href="/login"]').click()
})

When('I click on the link', () => {
    cy.xpath('//a[@data-testid="signup-link"]').click()
})

Then('I redirected on the registration page', () => {
    cy.xpath('//div[@class="signup-form-container"]').should('be.visible')
})