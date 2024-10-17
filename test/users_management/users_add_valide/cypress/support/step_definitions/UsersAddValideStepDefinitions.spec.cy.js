import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I click on the registration button', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

Given('I create a new account', () => {
    cy.xpath('//input[@id="signup-email"]').type('test@test.test')
    cy.xpath('//input[@id="signup-password"]').type('testTest001@')
    cy.xpath('//button[@id="signup-submit"]').click()
})

When('I connect on the website', () => {
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
    cy.xpath('//button[@type="submit"]').click()
})

When('I redirected on the users management page', () => {
    cy.xpath('//a[@href="gestion-utilisateur"]').click()
})

Then('I see the new user on the list', () => {
    cy.xpath('//div[@class="container"]').should('be.visible')
})