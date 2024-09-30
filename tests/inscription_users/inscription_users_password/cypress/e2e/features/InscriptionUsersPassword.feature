Feature: Inscription users password

    Scenario: I am a user who registrate on the plateform with a password only

    Given I am on the website
    And I redirected on the registration page
    When I fill my password on the fields
    Then I validate the registration

