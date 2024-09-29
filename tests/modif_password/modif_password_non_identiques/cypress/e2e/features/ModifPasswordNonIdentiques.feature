Feature: Modif password non identiques

    Scenario: I am a user who changes my password with a not identical password

    Given I m on the website
    And I connect on the website 
    When I redirected on edit page
    And I fill the fields
    And I validate the new password 
    Then I receive an error message