Feature: Connexion users password

    Scenario: I am a user who try to connect with a password only

    Given I am on the plateform
    And I redirected on the connexion page
    When I fill my password on the fields
    Then I validate my connexion