Feature: Connexion user invalide

    Scenario: I am a user trying to log in with credentials not linked to an account

    Given I am in the website
    And I redirected on the connexion page
    When I fill the invalidate id 
    And I validate the connexion 
    Then I receive an error message