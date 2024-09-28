Feature: Modif password long

    Scenario: I m a user who edit my password with a password long

    Given I m on the website
    And I connect on the website
    When I redirected on profil page
    And I click on button edit password 
    And I edit my password 
    And I confirm my new password 
    Then I receive an error message