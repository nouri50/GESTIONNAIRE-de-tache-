Feature: Connexion users email

    Scenario: I am a user who try to connect on the plateform with a email address only

    Given I am on the plateform
    And I redirected on the connexion page
    When I fill the email address on the fields
    Then I validate the connexion