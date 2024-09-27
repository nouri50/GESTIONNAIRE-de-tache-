Feature: Modif password long

    Scenario: I m a user who edit my actual password with a long password

    Given I m on the website
    And I m connect on the plateform
    When I m redirected on the profil page
    And I m redirected on the edit password page 
    And I fill all fields
    And I validate the new password 
    Then I receive an error message 