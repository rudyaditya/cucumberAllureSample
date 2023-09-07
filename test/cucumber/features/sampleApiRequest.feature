@sample
Feature: Sample feature for Cucumber API test

    Scenario: Get user list
        When I request to get users list
        Then I should receive a 200 status code

    Scenario: Get user list 2
        When I request to get users list
        Then I should receive a 200 status code

    # Scenario: Get user by id
    #     When I request to get user with id 2
    #     Then I should receive a 200 status code
    #     And I should see "id" property with 2 value
    #     And I should see "first_name" property with "Janet" value