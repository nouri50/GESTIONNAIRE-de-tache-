import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I connect on the website', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
    cy.xpath('//button[@type="submit"]').click()
})

When('I redirected on the edit password page', () => {
    cy.wait(5000)
    cy.xpath('//a[@href="/profil"]').click()
    cy.xpath('//button[@data-cy="profile-change-password-button"]').click()
})

When('I fill the fields', () => {
    cy.xpath('//input[@data-cy="current-password-input"]').type('nZit11031994@')
    cy.xpath('//input[@data-cy="new-password-input"]').type('testTest011@')
    cy.xpath('//input[@data-cy="confirm-password-input"]').type('testTest011@')
    cy.xpath('//button[@data-cy="submit-password-button"]').click()
})

Then('I redirected on the profile page', () => {
    cy.visit('http://localhost:3000/profil')
})