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

When('I redirected on the edit password page', () => {
    cy.wait(9000) 
    cy.get(':nth-child(4) > a').click() 
    cy.xpath('//button[normalize-space()="Modifier le mot de passe"]').click()  
})

When('I fill the fields', () => {
    cy.xpath('//input[@data-cy="current-password"]').type('nZit11031994@')
    cy.xpath('//input[@data-cy="new-password"]').type('test')
    cy.xpath('//input[@data-cy="confirm-password"]').type('test')
})

When('I confirm my new password', () => {
    cy.xpath('//button[normalize-space()="Changer le mot de passe"]').click()
})
 
Then('I receive an error message', () => {
    cy.xpath('//p[@class="message"]').should('be.visible')
})