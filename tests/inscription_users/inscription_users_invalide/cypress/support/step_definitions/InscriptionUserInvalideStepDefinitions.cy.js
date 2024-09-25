import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am in the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I go to the registration page', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

When('I fill in the information in the fields', () => {
    cy.xpath('//input[@placeholder="Email"]').type('nzito055@')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('nZit11031994@')
})

Then('I validate a new account', () => {
    cy.xpath('//button[@type="submit"]').click()
})

