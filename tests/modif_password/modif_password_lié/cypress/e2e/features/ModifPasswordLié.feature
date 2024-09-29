Feature: Modif password lié

    Scenario: I am a user who changes my password with a linked password

    Given I am on the website
    And I connect on the website
    When I redirected on the edit password page
    And I fill the fields
    And I validate my new password
    Then I receive an error message