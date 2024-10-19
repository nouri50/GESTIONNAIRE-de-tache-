Feature: Delete account user password valide

    Scenario: I am a user who try delete a user account with a password valide

    Given I am on the website
    And I connect on the website
    When I redirected on the users management page
    And I click on the delete account button
    And I fill the input with a valide password
    Then I receive an error message