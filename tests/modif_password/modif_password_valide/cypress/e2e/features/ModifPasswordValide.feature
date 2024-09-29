Feature: Modif password valide

    Scenario: I am a user who changes my password on the plateform

    Given I am on the website
    And I connect on the plateform 
    When I redirected on the edit password page
    And I fill the fields
    Then I validate the new password