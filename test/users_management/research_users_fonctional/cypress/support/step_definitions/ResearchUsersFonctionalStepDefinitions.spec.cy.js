import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
require('cypress-xpath')

Given('I am on the website', () => {
    cy.visit('http://localhost:3000')
})

Given('I connect on the website', () => {
    cy.xpath('//a[@href="/login"]').click()
    cy.xpath('//input[@type="email"]').type('test@test.com')
    cy.xpath('//input[@type="password"]').type('testTest088@')
    cy.xpath('//button[@type="submit"]').click()
})

When('I redirected on the users management page', () => {
    cy.xpath('//a[@href="/gestion-utilisateur"]').click()
})

When('I research an existant user', () => {
    //cy.wait(9000)
    cy.xpath('//input[@placeholder="Rechercher"]').type('test@test.test', {force: true})
})

Then('I see an existant user to display', () => {
    cy.xpath('//div[@class="user-management-page"]').should('be.visible')
})