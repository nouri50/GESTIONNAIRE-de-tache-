import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am in the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I click on the button start', () => {
    cy.xpath('//button[@class="start-button"]').click()
})

When('I fill my informations in the fields', () => {
    cy.xpath('//input[@placeholder="Email"]').type('nzito077@icloud.com')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('dzgeyfgeygftzgyerfgegfuerhgrzhnghergyehrygehrygeyrgurehguehrug@)')
})

When('I validate my new account', () => {
    cy.xpath('//button[@data-testid="signup-submit"]').click()
})

Then('I receive an error message', () => {
    cy.xpath('//div[@data-testid="password-error"]').should('be.visible')
})