Feature: Users add valide

    Scenario: I am a users who add a new user on the website

    Given I am on the website
    And I click on start button
    When I registrate a new user
    And I connect on the website with my account
    And I redirected on the user manage page
    Then I see a new user on the users list