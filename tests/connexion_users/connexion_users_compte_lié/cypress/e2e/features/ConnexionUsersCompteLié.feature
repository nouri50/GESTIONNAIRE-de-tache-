Feature: Connexion users compte lié

    Scenario: I am a user who connect to the plateform with a linked account

    Given I am on the website
    And I click on the button connexion 
    When I fill my id on the fields
    And I validate the connexion 
    Then I redirected on my personal page