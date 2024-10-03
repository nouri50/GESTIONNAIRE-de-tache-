Feature: Feature name

    Scenario: I am a user who try registrate on the website with a court password

    Given I am on the website
    And I click on the button start
    When I fill my personal informations
    And I confirm the registration
    Then I receive an error message