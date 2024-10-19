import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I connect on the website', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@data-testid="login-email"]').type('test@test.test')
    cy.xpath('//input[@data-testid="login-password"]').type('testTest001@')
    cy.xpath('//button[@data-testid="login-submit"]').click()
    cy.wait(5000)
})

When('I redirected on the users management page', () => {
    cy.xpath('//a[@href="/gestion-utilisateur"]').click()
})

When('I click on the delete user button', () => {
    cy.xpath('//img[@data-testid="delete-icon-user-3"]').click()
})

When('I fill on the input with a invalid password', () => {
    cy.xpath('//input[@data-testid="admin-password-input"]').type('testTest00@')
    cy.xpath('//button[@data-testid="confirm-delete-button"]').click()
})

Then('I receive an error message', () => {
    cy.xpath('//p[@data-testid="error-message"]').should('be.visible')
})