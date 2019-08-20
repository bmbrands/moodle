@editor @editor_atto @atto @atto_h5p @_file_upload @_switch_iframe
Feature: Add h5ps to Atto
  To write rich text - I need to add h5ps.

  Background:
    Given the following "courses" exist:
      | shortname | fullname   |
      | C1        | Course 1 |
    And the following "activities" exist:
      | activity | name       | intro      | introformat | course | content  | contentformat | idnumber |
      | page     | PageName1  | PageDesc1  | 1           | C1     | H5Ptest  | 1             | 1        |
    And I log in as "admin"
    And I am on "Course 1" course homepage
    And I follow "PageName1"
    And I navigate to "Edit settings" in current page administration
    And I click on "Insert h5p" "button" in the "#fitem_id_page" "css_element"

  @javascript
  Scenario: Insert a h5p as a file
    Given I set the field "Enter URL" to "https://h5p.org/h5p/embed/576651"
    And I click on "Save h5p" "button" in the "H5P properties" "dialogue"
    And I wait until the page is ready
    When I click on "Save and display" "button"
    And I switch to "h5pcontent" iframe
    Then I should see "Lorum ipsum"