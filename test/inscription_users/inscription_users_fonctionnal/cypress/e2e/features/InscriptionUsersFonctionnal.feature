Feature: Inscription users fonctionnal

    Scenario: I am a user who create a new account on the website

    Given I m on the website
    And I click on the button start
    When I fill my informations on the fields
    And I validate my new account
    Then I redirected on the connexion page