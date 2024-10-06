Feature: Users management valide

    Scenario: I am a user who add an another user on the website

    Given I am on the website 
    And I create a new account
    When I redirected on the users management page
    Then I will see the user data in the table