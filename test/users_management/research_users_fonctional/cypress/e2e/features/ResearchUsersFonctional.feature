Feature: Research users fonctional

    Scenario: I am a user who search a existant user on the user list

    Given I am on the website
    And I connect on the website
    When I redirected on the users management page 
    And I research an existant user 
    Then I see an existant user to display