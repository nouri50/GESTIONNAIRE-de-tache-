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
})

When('I click on the delete account button', () => {
    cy.xpath('//img[@data-testid="delete-icon-user-4"]').click()
})

When('I fill the input with a invalid password', () => {
    cy.xpath('//input[@data-testid="admin-password-input"]').type('nZit110394@')
    cy.xpath('//button[@data-testid="confirm-delete-button"]').click()
})

Then('I receive an error message', () => {
    cy.xpath('//p[@data-testid="error-message"]').should('be.visible')
})