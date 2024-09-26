import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am in the website', () => {
    cy.visit('http://localhost:3000')
})

When('I go to the registration page', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

Then('I validate my new account', () => {
    cy.xpath('//button[@type="submit"]').click()
})