import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I m on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I m connect on the plateform', () => {
    cy.xpath('//a[normalize-space()="Connexion"]').click()
    cy.xpath('//input[@placeholder="Email"]').type('nzito055@icloud.com')
    cy.xpath('//input[@placeholder="Mot de passe"]').type('nZit11031994@')
    cy.xpath('//button[@type="submit"]').click()
})

When('I m redirected on the profil page', () => {
    cy.xpath('//a[normalize-space()="Profil"]').click()
})

When('I m redirected on the edit password page', () => {
    cy.get('.change-password-btn').click()
})

When('I fill all fields', () => {
    cy.xpath('//input[@type="password"]').type('nZit11031994@')
    cy.xpath('//div[@class="change-password-page"]//div[1]//input[1]').type('testTest07dzefgdzygfygzeygfcyzgfyzgyfgefzczgyzgefyzgyzgq@')
    cy.xpath('//div[3]//input[1]').type('testTest07dzefgdzygfygzeygfcyzgfyzgyfgefzczgyzgefyzgyzgq@')
})

When('I validate the new password', () => {
    cy.xpath('//button[normalize-space()="Changer le mot de passe"]').click()
})

Then('I receive an error message', () => {
    cy.xpath('//p[@class="message"]').should('be.visible')
})