Feature: Cancelled users account

    Scenario: I am a user who cancelled a user account on the user list

    Given I am on the website
    And I connect on the website
    When I redirected on the users management page
    And I try delete a user account
    Then I redirected on the users list