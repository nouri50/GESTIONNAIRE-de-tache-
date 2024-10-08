import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

When('I redirected on the registration page', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

Then('I validate the registration', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
})