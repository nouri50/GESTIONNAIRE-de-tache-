import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I click on start button', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

When('I registrate a new user', () => {
    cy.xpath('//input[@data-testid="signup-email"]').type('test@test.test')
    cy.xpath('//input[@data-testid="signup-password"]').type('testTest001@')
    cy.xpath('//button[@data-testid="signup-submit"]').click()
})

When('I connect on the website with my account', () => {
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
    cy.xpaht('//button[@type="submit"]').click()
})