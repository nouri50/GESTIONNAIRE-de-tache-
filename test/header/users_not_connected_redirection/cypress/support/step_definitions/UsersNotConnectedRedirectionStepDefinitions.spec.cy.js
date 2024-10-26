import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

When('I selected a option', () => {
    cy.xpath('//a[@href="/gestion-utilisateur"]').click()
})

Then('I redirected on the connexion page', () => {
    cy.xpath('//div[@class="login-container"]').should('be.visible')
})