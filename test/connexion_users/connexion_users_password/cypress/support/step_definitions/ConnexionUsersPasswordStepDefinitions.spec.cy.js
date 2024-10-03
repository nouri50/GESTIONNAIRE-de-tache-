import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I click on the button connexion', () => {
    cy.xpath('//a[@href="/login"]').click()
})

When('I fill my password on the field', () => {
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
})

Then('I validate the connexion', () => {
    cy.xpath('//button[@type="submit"]').click()
})