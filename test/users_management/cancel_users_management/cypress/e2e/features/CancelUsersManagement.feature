Feature: Cancel users management

    Scenario: I am a user who try modify my informations and i cancel the modification

    Given I am on the website
    And I connect on the website
    When I redirected on the users management page
    And I click on the edit button
    And I click on the cancel button
    Then I redirected on the users list