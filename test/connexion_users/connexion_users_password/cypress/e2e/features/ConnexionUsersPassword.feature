Feature: Connexion users password

    Scenario: I am a user who try connect on the website with a password only

    Given I am on the website
    And I click on the button connexion 
    When I fill my password on the field
    Then I validate the connexion