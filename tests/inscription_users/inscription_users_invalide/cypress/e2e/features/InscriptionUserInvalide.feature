Feature: Inscription user invalide

    Scenario: I am an user on the website and i create an new account using a non-functional email address

    Given I am in the website 
    And I go to the registration page
    When I fill in the information in the fields
    Then I validate a new account 
  