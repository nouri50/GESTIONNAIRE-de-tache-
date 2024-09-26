import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am in the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I am in the registration page', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

When('I fill in the identifiers in the fields', () => {
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
})

When('I validate my new account', () => {
    cy.xpath('//button[@type="submit"]').click()
})

Then('I get an error message', () => {
    cy.xpath('//div[@class="status-message"]').should('be.visible')
})