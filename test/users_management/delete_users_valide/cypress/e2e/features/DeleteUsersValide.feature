Feature: Delete users valide

    Scenario: I am user who delete an user account

    Given I am on the website
    And I connect on the website
    When I redirected on the users management page
    And I delete an user account
    Then I see the users list