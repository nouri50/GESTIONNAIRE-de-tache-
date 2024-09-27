import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I m on the website', () => {
    cy.visit('http://localhost:3000')
})

When('I click on the button Connexion', () => {
    cy.xpath('//a[normalize-space()="Connexion"]').click()
})

Then('I click on the button Login', () => {
    cy.xpath('//button[normalize-space()="Connexion"]').click()
})