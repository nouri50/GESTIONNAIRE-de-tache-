import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor'
require('cypress-xpath')

Given('I am in the website', () => {
    cy.visit('http://localhost:3000')
})

When('I redirected in the connexion page', () => {
    cy.xpath('//button[@class="login-button"]').click()
})

Then('I validate the connexion', () => {
    cy.xpath('//button[@data-testid="login-button"]').click()
})