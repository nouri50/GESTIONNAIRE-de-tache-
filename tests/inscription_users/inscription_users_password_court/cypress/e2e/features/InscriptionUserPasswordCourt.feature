Feature: Inscription user password court

    Scenario: I am a user creating an account with a password court

    Given I am in the website
    And I am in the registration page
    When I fill in the identifiers in the fields
    And I validate my new account
    Then I receive an error message 