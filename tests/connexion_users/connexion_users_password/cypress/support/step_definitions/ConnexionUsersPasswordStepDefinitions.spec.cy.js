import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the plateform', () => {
    cy.visit('http://localhost:3000')
})

Given('I redirected on the connexion page', () => {
    cy.xpath('//a[@href="/login"]').click()
})

When('I fill my password on the fields', () => {
    cy.xpath('//input[@type="password"]').type('testTest011@')
})

Then('I validate my connexion', () => {
    cy.xpath('//button[@type="submit"]').click()
})