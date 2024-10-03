import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I click on the button connexion', () => {
    cy.xpath('//a[@href="/login"]').click()
})

When('I redirected on the connexion page', () => {
    cy.visit('http://localhost:3000/login')
})

When('I fill my account id on the fields', () => {
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
})

When('I validate the connexion', () => {
    cy.xpath('//button[@type="submit"]').click()
})

Then('I redirected on the personal page', () => {
    cy.visit('http://localhost:3000/home')
})