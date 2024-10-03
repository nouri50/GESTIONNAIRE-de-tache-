Feature: Connexion users not linked account

    Scenario: I am a user who try connect on the website with a not linked account

    Given I am on the website
    And I redirected on the connexion page 
    When I fill the account id on the fields
    And I click on the button connexion 
    Then I receive an error message