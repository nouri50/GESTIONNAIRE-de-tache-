import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I m on the plateform', () => {
    cy.visit('http://localhost:3000')
})

Given('I redirected on the registration page', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

When('I fill my email address on the fields', () => {
    cy.xpath('//input[@data-testid="signup-email"]').type('test@test.test')
})

Then('I validate the registration', () => {
    cy.wait(9000)
    cy.xpath('//button[@data-testid="signup-submit"]').click({force: true})
})