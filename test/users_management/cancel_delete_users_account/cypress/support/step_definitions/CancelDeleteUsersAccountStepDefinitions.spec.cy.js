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
    cy.xpath('//img[@data-testid="delete-icon-user-2"]').click()
})

When('I click on the cancel button', () => {
    cy.xpath('//button[@data-testid="cancel-delete-button"]').click()
})

Then('I see the users list', () => {
    cy.xpath('//table[@data-testid="user-table"]').should('be.visible')
})