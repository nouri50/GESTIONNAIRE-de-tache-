import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am in the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I am in the registration page', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

When('I fill in the identifiers in the fields', () => {
    cy.xpath('//input[@placeholder="Email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('nZit')
})

When('I validate my new account', () => {
    cy.xpath('//button[@type="submit"]').click()
})

Then('I receive an error message', () => {
    cy.xpath('//div[@class="error-message"]').should('be.visible')
})