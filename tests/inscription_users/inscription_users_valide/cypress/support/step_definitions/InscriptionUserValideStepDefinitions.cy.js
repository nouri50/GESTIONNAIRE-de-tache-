import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath');

Given("I am in the website", () => {
    cy.visit('http://localhost:3000')
})

Given("I go to the registration page", () => {
    cy.xpath('//button[@class="start-button"]').click()
})

When("I fill in the information in the fields", () => {
    cy.xpath('//input[@placeholder="Email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('nZit11031994@')
})

When("I validate my new account", () => {
    cy.xpath('//button[@type="submit"]').click()
})

Then("I am in the connexion page", () => {
    cy.visit('http://localhost:3000/login')
})