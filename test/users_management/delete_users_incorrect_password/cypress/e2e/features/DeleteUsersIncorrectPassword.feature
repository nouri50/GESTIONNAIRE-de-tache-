Feature: Delete users incorrect password

    Scenario: I am a user who try delete an user account with a incorrect password

    Given I am on the website
    And I connect on the website
    When I redirected on the users management page
    And I try delete an user account
    Then I receive an error message