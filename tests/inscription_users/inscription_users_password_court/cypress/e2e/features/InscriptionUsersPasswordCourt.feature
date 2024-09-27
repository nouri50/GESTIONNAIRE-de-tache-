Feature: Inscription users password court

    Scenario: I am a user who create a new account with a court password

    Given I m in the website
    And I click on the button start
    When I fill my id in the fields
    And I validate my new account
    Then I receive an error message