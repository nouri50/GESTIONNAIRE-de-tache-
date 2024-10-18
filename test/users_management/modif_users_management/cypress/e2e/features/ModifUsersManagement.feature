Feature: Modif users management

    Scenario: I am a user who modify my informations on my profile

    Given I am on the website
    And I connect on the website
    When I redirected on the users management page
    And I click on the modifications
    And I modify my informations
    Then I see the modifications on the table