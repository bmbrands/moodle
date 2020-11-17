<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Textarea profile field define.
 *
 * @package    profilefield_social
 * @copyright  2020 Bas Brands <bas@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Class profile_field_social.
 *
 * @copyright  2020 Bas Brands <bas@moodle.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class profile_field_social extends profile_field_base {

    /**
     * Adds elements for this field type to the edit form.
     * @param moodleform $mform
     */
    public function edit_field_add($mform) {
        $mform->addElement('text', $this->inputname, $this->field->name, null, null);
        $mform->setType($this->inputname, PARAM_RAW);
    }

    /**
     * alter the fieldname to be fetched from the language file.
     *
     * @param stdClass $field
     */
    public function set_field($field) {
        $networks = [
            'icq' => get_string('icqnumber', 'moodle'),
            'msn' => get_string('msnid', 'moodle'),
            'aim' => get_string('aimid', 'moodle'),
            'yahoo' => get_string('yahooid', 'moodle'),
            'skype' => get_string('skypeid', 'moodle'),
            'url' => get_string('webpage', 'moodle'),
        ];
        $field->name = $networks[$field->name];
        parent::set_field($field);
    }

    /**
     * Display the data for this field
     * @return string
     */
    public function display_data() {
        $network = $this->field->shortname;

        $networkurls = [
            'skype' => '<a href="skype:%%DATA%%?call">%%DATA%%</a>',
            'icq' => '<a href="http://www.icq.com/whitepages/cmd.php?uin=%%DATA%%&action=message">%%DATA%%</a>',
            'url' => '<a href="%%DATA%%">%%DATA%%</a>'
        ];

        if (array_key_exists($network, $networkurls)) {
            return str_replace('%%DATA%%', $this->data, $networkurls[$network]);
        }

        return $this->data;
    }

    /**
     * Return the field type and null properties.
     * This will be used for validating the data submitted by a user.
     *
     * @return array the param type and null property
     * @since Moodle 3.2
     */
    public function get_field_properties() {
        return array(PARAM_RAW, NULL_NOT_ALLOWED);
    }
}


