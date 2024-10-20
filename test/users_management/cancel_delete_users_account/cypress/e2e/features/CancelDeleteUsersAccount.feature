Feature: Cancel delete users account

    Scenario: I am a user who cancel the delete account

    Given I am on the website
    And I connect on the website
    When I redirected on the users management page
    And I click on the delete account button
    And I click on the cancel button
    Then I see the users list