Feature: Inscription users password long

    Scenario: I am a user who create a new account with a long password

    Given I am in the website
    And I click on the button start
    When I fill my informations in the fields
    And I validate my new account 
    Then I receive an error message