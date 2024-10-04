Feature: Modif password valide

    Scenario: I am a user who edit my password on the website

    Given I am on the website
    And I connect on the website
    When I redirected on the edit password page
    And I fill the fields
    Then I redirected on the profile page