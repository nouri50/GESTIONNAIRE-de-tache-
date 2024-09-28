Feature: Modif password court

    Scenario: I am a user who changes my password with a short password

    Given I m on the website
    And I connect on the website 
    When I redirected on the edit password page
    And I fill the fields
    And I confirm my new password
    Then I receive an error message