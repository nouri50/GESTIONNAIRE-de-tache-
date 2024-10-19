Feature: Delete account admin password invalide

    Scenario: I am a admin user who try delete a user account with a invalid password

    Given I am on the website
    And I connect on the website
    When I redirected on the users management page
    And I click on the delete account button
    And I fill the input with a invalid password
    Then I receive an error message