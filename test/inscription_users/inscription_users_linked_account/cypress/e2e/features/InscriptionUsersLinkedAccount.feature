Feature: Inscription users linked account

    Scenario: I am a user who try create an account with a linked account

    Given I am on the website
    And I click on the button start
    When I fill my informations on the fields
    And I validate the registration
    Then I receive an error message