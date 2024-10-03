import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I redirected on the connexion page', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

When('I fill the account id on the fields', () => {
    cy.xpath('//input[@type="email"]').type('test@test.test')
    cy.xpath('//input[@type="password"]').type('testTest099@')
})

When('I click on the button connexion', () => {
    cy.xpath('//button[@type="submit"]').click()
})

Then('I receive an error message', () => {
    cy.wait(9000)
    cy.xpath('//p[@data-testid="status-message"]').should('be.visible')
})