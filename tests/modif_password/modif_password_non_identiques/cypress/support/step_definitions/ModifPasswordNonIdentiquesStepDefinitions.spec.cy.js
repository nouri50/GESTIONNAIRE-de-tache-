import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I m on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I connect on the website', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
    cy.xpath('//button[@type="submit"]').click()
})

When('I redirected on edit page', () => {
    cy.wait(9000)
    cy.xpath('//a[@href="/profil"]').click()
    cy.xpath('//button[@data-cy="profile-change-password-button"]').click()
})

When('I fill the fields', () => {
    cy.xpath('//input[@data-cy="current-password"]').type('nZit11031994@')
    cy.xpath('//input[@data-cy="new-password"]').type('testTest01@')
    cy.xpath('//input[@data-cy="confirm-password"]').type('testTest02@')
})

When('I validate the new password', () => {
    cy.xpath('//button[@data-cy="change-password-button"]').click()
})

Then('I receive an error message', () => {
    cy.xpath('//p[@data-cy="change-password-message"]').should('be.visible')
})

