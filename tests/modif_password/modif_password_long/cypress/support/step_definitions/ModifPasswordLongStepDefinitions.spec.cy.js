import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I m on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I connect on the website', () => {
    cy.xpath('//a[normalize-space()="Connexion"]').click()
    cy.xpath('//input[@data-testid="email-input"]').type('nzito055@icloud.com')
    cy.xpath('//input[@data-testid="password-input"]').type('nZit11031994@')
    cy.xpath('//button[normalize-space()="Connexion"]').click()
})

When('I redirected on profil page', () => {
    cy.xpath('//a[normalize-space()="Profil"]').click()
})

When('I click on button edit password', () => {
    cy.xpath('//button[@class="modify-password-button"]').click()
})

When('I edit my password', () => {
    cy.xpath('//div[@class="change-password-page"]').type('nZit11031994@')
    cy.xpath('//input[@type="password"]').type('jxhsdugzqydxgzyegdfyzegyhusashazudhuazdhyzegfygzebfzyegfyebgfyegfycegyfuo@')
    cy.xpath('//*[@id="root"]').type('jxhsdugzqydxgzyegdfyzegyhusashazudhuazdhyzegfygzebfzyegfyebgfyegfycegyfuo@')
})

When('I confirm my new password', () => {
    cy.xpath('//button[@data-testid="change-password-button"]').click()
})

Then('I receive an error message', () => {
    cy.xpath('//p[@class="message"]').should('be.visible')
})

