Feature: Delete account admin password valide

    Scenario: I am a admin user who delete a user on the users list with a valid password

    Given I am on the website
    And I connect on the website
    When I redirected on the users management page
    And I click on the delete user button
    And I fill the input with my admin password
    And I click on the validation button
    Then I receive a success message