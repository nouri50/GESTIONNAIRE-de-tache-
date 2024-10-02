import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I m on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I click on the button start', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

When('I fill my informations on the fields', () => {
    cy.xpath('//input[@data-testid="signup-email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@data-testid="signup-password"]').type('nZit11031994@')
})

When('I validate my new account', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
})

Then('I redirected on the connexion page', () => {
    cy.visit('http://localhost:3000/login')
})