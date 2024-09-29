Feature: Modif password long

    Scenario: I m a user who changes my paswword with a long password

    Given I am on the website
    And I connect on the website 
    When I redirected on the edit password page
    And I fill the fields 
    And I confirm my new password
    Then I receive an error message