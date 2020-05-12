@core @core_contentbank @contentbank_h5p @_file_upload @javascript
Feature: Sort content in the content bank
  In order to temporarily organise the content of the content bank
  As an admin
  I need to be able to sort the content bank in various ways

  Background:
    Given the following "contentbank content" exist:
        | contextid | contenttype       | user  | contentname          |
        | 1         | contenttype_h5p   | admin | Dragon_santjordi.h5p |
        | 1         | contenttype_h5p   | admin | mathsbook.h5p        |
        | 1         | contenttype_h5p   | admin | historybook.h5p      |

  Scenario: Admins can search content in the content bank
    Given I log in as "admin"
    And I am on site homepage
    And I turn editing mode on
    And I add the "Navigation" block if not present
    And I expand "Site pages" node
    And I click on "Content bank" "link"
    When I click on "Display folder with file details" "button"
    And I click on "Sort by content ascending" "button"
    And "Dragon_santjordi.h5p" "text" should appear before "historybook.h5p" "text"
    And "historybook.h5p" "text" should appear before "mathsbook.h5p" "text"
    And I click on "Sort by content descending" "button"
    Then "historybook.h5p" "text" should appear before "Dragon_santjordi.h5p" "text"

