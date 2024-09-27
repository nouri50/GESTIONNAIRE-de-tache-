Feature: Inscription users compte valide

    Scenario: I am a user who try create a account with a linked account

    Given I am on the website
    And I click on button start
    When I fill informations in the fields
    And I click on button connxeion
    Then I receive an error message