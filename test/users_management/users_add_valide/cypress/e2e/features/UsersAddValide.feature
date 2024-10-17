Feature: Users add valide

    Scenario: I am a user who add a new user on the website

    Given I am on the website
    And I click on the registration button
    And I create a new account
    When I connect on the website
    And I redirected on the users management page
    Then I see the new user on the list