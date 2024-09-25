Feature: Inscription user valide

    Scenario: I m an user who create an account on the website

    Given I am in the website 
    And I go to the registration page
    When I fill in the information in the fields
    And I validate my new account 
    Then I am in the connexion page