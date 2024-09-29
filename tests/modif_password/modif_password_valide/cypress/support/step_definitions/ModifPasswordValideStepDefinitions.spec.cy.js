import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I connect on the plateform', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
    cy.xpath('//button[@type="submit"]').click()
})

When('I redirected on the edit password page', () => {
    cy.wait(9000)
    cy.xpath('//a[@href="/profil"]').click()
    cy.wait(7000)
    cy.xpath('//button[@data-cy="profile-change-password-button"]').click()
})

When('I fill the fields', () => {
    cy.xpath('//input[@data-cy="current-password"]').type('nZit11031994@')
    cy.xpath('//input[@data-cy="new-password"]').type('testTest011@')
    cy.xpath('//input[@data-cy="confirm-password"]').type('testTest011@')
})

Then('I validate the new password', () => {
    cy.xpath('//button[@data-cy="change-password-button"]').click()
})