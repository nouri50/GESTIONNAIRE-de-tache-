import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I click on button start', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

When('I fill informations in the fields', () => {
    cy.xpath('//input[@placeholder="Email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('nZit11031994@')
})

When('I click on button connxeion', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
})

Then('I receive an error message', () => {
    cy.xpath('//div[@class="status-message"]').should('be.visible')
})