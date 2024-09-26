Feature: Connexion user valide

    Scenario: I am an user who logs my account on the website

    Given I am in the website
    And I click on the button of connexion 
    When I fill my id on the fields
    And I validate my connexion 
    Then I will be redirected on my personal page

