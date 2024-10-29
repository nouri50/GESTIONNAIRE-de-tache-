import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I redirected on the connexion page', () => {
    cy.xpath('//a[@href="/login"]').click()
})

Given('I click on the password reset button', () => {
    cy.xpath('//a[@href="/forgot-password"]').click()
})

When('I fill my mail address on the input', () => {
    cy.xpath('//input[@type="email"]').type('nzito055@icloud.com')
})

When('I click on the button', () => {
    cy.xpath('//button[@data-cy="forgot-password-submit-button"]').click()
})

When('I redirected on my email box', () => {
    cy.visit('https://www.icloud.com/mail/')
    cy.xpath('//span[@class="thread-participants ic-wcudwb"]').click()
    cy.xpath('//a[@href="http://localhost:3000/reset-password/1f8cd1d9e45fc0aac1d1622fb9459d5580487db2"]').click()
})

When('I fill the inputs', () => {
    cy.xpath('//input[@data-cy="reset-password-new-password-input"]').type('nZit11031994@')
    cy.xpath('//input[@data-cy="reset-password-confirm-password-input"]').type('nZit11031994@')
})

When('I click on the reset password button', () => {
    cy.xpath('//button[@data-cy="reset-password-submit-button"]').click()
})

Then('I return on the connexion page', () => {
    cy.xpath('//div[@class="login-container"]').should('be.visible')
})