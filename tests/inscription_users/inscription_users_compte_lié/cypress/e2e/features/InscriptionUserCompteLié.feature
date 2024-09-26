Feature: Inscription user compte lié

    Scenario: I am a user creating an account with linked credentials

    Given I am in the website
    And I am in the registration page
    When I fill in the identifiers in the fields
    And I validate my new account
    Then I get an error message