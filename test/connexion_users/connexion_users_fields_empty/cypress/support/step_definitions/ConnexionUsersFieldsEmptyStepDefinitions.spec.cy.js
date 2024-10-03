import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

When('I redirected on the connexion page', () => {
    cy.xpath('//a[@href="/login"]').click()
})

Then('I validate the connexion', () => {
    cy.xpath('//button[@type="submit"]').click()
})