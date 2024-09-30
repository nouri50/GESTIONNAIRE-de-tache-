import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I redirected on the registration page', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

When('I fill my password on the fields', () => {
    cy.wait(9000)
    cy.xpath('//input[@data-testid="signup-password"]').type('testTest099@')
})

Then('I validate the registration', () => {
    cy.wait(9000)
    cy.xpath('//button[@data-testid="signup-submit"]').click({force: true})
})