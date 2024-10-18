import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I connect on the website', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@data-testid="login-email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@data-testid="login-password"]').type('nZit11031994@')
    cy.xpath('//button[@data-testid="login-submit"]').click()
    cy.wait(5000)
})

When('I redirected on the users management page', () => {
    cy.xpath('//a[@href="/gestion-utilisateur"]').click()
    cy.wait(5000)
})

When('I click on the edit button', () => {
    cy.xpath('//img[@data-testid="edit-icon-user-1"]').click()
})

When('I click on the cancel button', () => {
    cy.xpath('//button[@data-testid="cancel-edit-button"]').click()
})

Then('I redirected on the users list', () => {
    cy.visit('http://localhost:3000/gestion-utilisateur')
})