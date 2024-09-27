Feature: Connexion users compte non lié 

    Scenario: I am a user trying to log in with an unlinked account

    Given I am on the website
    And I click on the button connexion 
    When I fill the id on the fields
    And I validate the connexion 
    Then I receive an error message