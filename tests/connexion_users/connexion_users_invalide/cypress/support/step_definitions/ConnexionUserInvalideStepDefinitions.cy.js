import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am in the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I redirected on the connexion page', () => {
    cy.xpath('//button[@class="login-button"]').click()
})

When('I fill the invalidate id', () => {
    cy.xpath('//input[@placeholder="Email"]').type('test@test.test')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('testTest99@')
})

When('I validate the connexion', () => {
    cy.xpath('//button[@data-testid="login-button"]').click()
})

Then('I receive an error message', () => {
    cy.xpath('//div[@data-testid="login-error"]').should('be.visible')
})