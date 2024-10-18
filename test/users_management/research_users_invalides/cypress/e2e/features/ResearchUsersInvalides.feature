Feature: Research users invalides

    Scenario: I am a user who research an inexistant users

    Given I am on the website
    And I connect on the website
    When I redirected on the users management page
    And I research a user
    Then I receive an error message