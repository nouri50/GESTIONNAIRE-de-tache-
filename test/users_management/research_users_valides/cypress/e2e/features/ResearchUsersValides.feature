Feature: Research users valides

    Scenario: I am a user who research an existant user on the list

    Given I am on the website
    And I click on the connexion button
    When I connect on the website
    And I redirected on the user management page
    And I research a user
    Then I see 