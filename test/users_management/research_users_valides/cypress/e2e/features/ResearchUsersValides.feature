Feature: Research users valides

    Scenario: I am a user who research a user on the list

    Given I am on the website
    And I connect on the website
    When I redirected on the users management page
    And I research a user
    Then I see a user on the list