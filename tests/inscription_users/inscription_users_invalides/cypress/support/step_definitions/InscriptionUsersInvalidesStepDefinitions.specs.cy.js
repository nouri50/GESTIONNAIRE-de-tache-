import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am in the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I click on button start', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

When('I fill the informations in the fields', () => {
    cy.xpath('//input[@placeholder="Email"]').type('nzito066@')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('testTESTdzfuzf234@')
})

Then('I validate the registration', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
})