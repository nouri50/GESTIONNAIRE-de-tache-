import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I connect on the website', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('testTest011@')
    cy.xpath('//button[@type="submit"]').click()
})

When('I redirected on the edit password page', () => {
    cy.wait(9000)
    cy.xpath('//a[@href="/profil"]').click()
    cy.get('[data-cy="profile-change-password-button"]').click()
})

When('I fill the fields', () => {
    cy.xpath('//input[@data-testid="current-password-input"]').type('testTest011@')
    cy.xpath('//input[@data-testid="new-password-input"]').type('testTest011@')
    cy.xpath('//input[@data-testid="confirm-password-input"]').type('testTest011@')
})

When('I validate my new password', () => {
    cy.wait(9000)
    cy.xpath('//button[@data-testid="submit-button"]').click({force: true})
})

Then('I receive an error message', () => {
    cy.xpath('//p[@data-testid="message"]').should('be.visible')
})