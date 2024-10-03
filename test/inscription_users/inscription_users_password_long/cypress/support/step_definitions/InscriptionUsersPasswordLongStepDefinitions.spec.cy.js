import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I click on the button start', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

When('I fill my personal informations', () => {
    cy.xpath('//input[@data-testid="signup-email"]').type('test@test.test')
    cy.xpath('//input[@data-testid="signup-password"]').type('testTestTestTestTestTestTestTest67896866767565657@')
})

When('I validate my registration', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
})

Then('I receive an error message', () => {
    cy.xpath('//div[@data-testid="password-error"]').should('be.visible')
})