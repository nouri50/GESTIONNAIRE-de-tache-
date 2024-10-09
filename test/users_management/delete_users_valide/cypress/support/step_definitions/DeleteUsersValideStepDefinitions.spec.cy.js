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
    cy.wait(5000)
})

When('I redirected on the users management page', () => {
    cy.get(':nth-child(4) > a').click()
})

When('I delete an user account', () => {
    cy.xpath('//button[@data-cy="delete-user-4"]').click({force: true})
    cy.xpath('//input[@data-cy="password-input"]').type('nZit11031994@')
    cy.xpath('//button[@data-cy="confirm-delete"]').click({force: true})
})

Then('I see the users list', () => {
    cy.xpath('//div[@data-cy="user-management-page"]').should('be.visible')
})