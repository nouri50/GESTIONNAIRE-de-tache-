import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am in the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I click on the button of connexion', () => {
    cy.xpath('//button[@class="login-button"]').click()
})

When('I fill my id on the fields', () => {
    cy.xpath('//input[@placeholder="Email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('nZit11031994@')
})

When('I validate my connexion', () => {
    cy.xpath('//button[@data-testid="login-button"]').click()
})

Then('I will be redirected on my personal page', () => {
    cy.visit('http://localhost:3000/home')
})