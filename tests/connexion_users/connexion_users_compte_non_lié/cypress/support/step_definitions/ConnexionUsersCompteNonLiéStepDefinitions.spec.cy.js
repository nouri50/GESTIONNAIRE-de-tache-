import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I click on the button connexion', () => {
    cy.xpath('//button[@class="login-button"]').click()
})

When('I fill the id on the fields', () => {
    cy.xpath('//input[@data-testid="email-input"]').type('test1@test.com')
    cy.xpath('//input[@data-testid="password-input"]').type('testTest090909@')
})

When('I validate the connexion', () => {
    cy.xpath('//button[@data-testid="login-button"]').click()
})

Then('I receive an error message', () => {
    cy.xpath('//div[@data-testid="login-error"]').should('be.visible')
})