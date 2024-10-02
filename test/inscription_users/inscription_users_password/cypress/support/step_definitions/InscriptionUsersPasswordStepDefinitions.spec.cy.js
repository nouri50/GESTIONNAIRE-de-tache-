import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I click on the button start', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

When('I fill on the password field my password', () => {
    cy.xpath('//input[@data-testid="signup-password"]').type('testTest099@')
})

Then('I validate my account', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
})