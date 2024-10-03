Feature: Inscription users password long

    Scenario: I am a user who try registrate with a long password

    Given I am on the website
    And I click on the button start
    When I fill my personal informations
    And I validate my registration
    Then I receive an error message