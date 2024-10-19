Feature: Delete account user invalide

    Scenario: I am a user who try delete a user with a invalid password

    Given I am on the website
    And I connect on the website
    When I redirected on the users management page
    And I click on the delete user button
    And I fill on the input with a invalid password
    Then I receive an error message