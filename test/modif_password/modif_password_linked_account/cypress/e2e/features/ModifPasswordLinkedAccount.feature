Feature: Modif password linked account

    Scenario: I am a user who try edit my password with a linked account password

    Given I am on the website
    And I connect on the website
    When I redirected on the edit password page
    And I fill the fields
    Then I receive an error message