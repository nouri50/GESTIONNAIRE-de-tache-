import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the plateform', () => {
    cy.visit('http://localhost:3000')
})

Given('I redirected on the connexion page', () => {
    cy.xpath('//a[@href="/login"]').click()
})

When('I fill the email address on the fields', () => {
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
})

Then('I validate the connexion', () => {
    cy.xpath('//button[@type="submit"]').click()
})