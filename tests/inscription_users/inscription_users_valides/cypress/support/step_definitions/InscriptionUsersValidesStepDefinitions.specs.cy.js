import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am in the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I click on button start', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

When('I fill my id in fields', () => {
    cy.xpath('//input[@placeholder="Email"]').type('test@test.test')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('testTest01020304@')
})

When('I validate my new account', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
})

Then('I redirected in other page', () => {
    cy.visit('http://localhost:3000/login')
})