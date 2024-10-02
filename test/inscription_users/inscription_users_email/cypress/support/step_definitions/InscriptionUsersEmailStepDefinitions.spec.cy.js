import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I click on the button start', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

When('I fill my email on the email field', () => {
    cy.xpath('//input[@data-testid="signup-email"]').type('test@test.test')
})

Then('I validate my new account', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
})