import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I click on the button connexion', () => {
    cy.xpath('//button[@class="login-button"]').click()
})

When('I fill my id on the fields', () => {
    cy.xpath('//input[@data-testid="email-input"]').type('nzito055@icloud.com')
    cy.xpath('//input[@data-testid="password-input"]').type('nZit11031994@')
})

When('I validate the connexion', () => {
    cy.xpath('//button[@data-testid="login-button"]').click()
})

Then('I redirected on my personal page', () => {
    cy.visit('http://localhost:3000/home')
})