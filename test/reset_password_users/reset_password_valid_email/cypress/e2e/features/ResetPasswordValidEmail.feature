Feature: Reset password valid email

    Scenario: I am a user who reset my password with my account linked email

    Given I am on the website
    And I redirected on the connexion page
    And I click on the password reset button
    When I fill my mail address on the input
    And I click on the button
    And I redirected on my email box
    And I fill the inputs
    And I click on the reset password button
    Then I return on the connexion page