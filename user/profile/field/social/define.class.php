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
 * @package   profilefield_social
 * @copyright 2020 Bas Brands <bas@moodle.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Class profile_define_social.
 *
 * @copyright  2020 Bas Brands <bas@moodle.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class profile_define_social extends profile_define_base {

    /**
     * Prints out the form snippet for the part of creating or editing a profile field common to all data types.
     *
     * @param moodleform $form instance of the moodleform class
     */
    public function define_form_common(&$form) {
        $networks = array_merge(['0' => get_string('select')], $this->get_networks());


        echo '<pre>hallloo' .$form->_defaultValues['name'] . '</pre>';
        $form->addElement('hidden', 'defaultdata', '');
        $form->setType('defaultdata', PARAM_TEXT);

        $form->addElement('select', 'network', 'Social provider', $networks);
        $form->addRule('network', get_string('required'), 'required', null, 'client');
        $form->setDefault('network', 'url');
        $form->setType('network', PARAM_TEXT);

        parent::define_form_common($form);
        $form->removeElement('name');
        $form->removeElement('shortname');
    }

    /**
     * Get the available social networks for configuration
     * @return array list of social networks.
     */
    private function get_networks() {
        global $DB;
        $networks = [
            'icq' => get_string('icq', 'profilefield_social'),
            'msn' => get_string('msn', 'profilefield_social'),
            'aim' => get_string('aim', 'profilefield_social'),
            'yahoo' => get_string('yahoo', 'profilefield_social'),
            'skype' => get_string('skype', 'profilefield_social'),
            'url' => get_string('url', 'profilefield_social'),
        ];
        return $networks;
    }

    /**
     * Alter form based on submitted or existing data
     * @param moodleform $mform
     */
    public function define_after_data(&$form) {
        if (isset($form->_defaultValues['name'])) {
            $form->setDefault('network', $form->_defaultValues['name']);
        }
    }

    /**
     * Validate the data from the add/edit profile field form that is common to all data types.
     *
     * Generally this method should not be overwritten by child classes.
     *
     * @param stdClass|array $data from the add/edit profile field form
     * @param array $files
     * @return  array    associative array of error messages
     */
    public function define_validate_common($data, $files) {
        global $DB;

        $err = array();

        if (empty($data->network) || !array_key_exists($data->network, $this->get_networks())) {
            $err['network'] = get_string('invalidnetwork', 'profilefield_social');
        }
        if ($field = $DB->get_record('user_info_field', array('shortname' => $data->network))) {
            if ($field and $field->id <> $data->id) {
                $err['network'] = get_string('networkinuse', 'profilefield_social');
            }
        }
        return $err;
    }
    /**
     * Preprocess data from the add/edit profile field form before it is saved.
     *
     * This method is a hook for the child classes to overwrite.
     *
     * @param array|stdClass $data from the add/edit profile field form
     * @return array|stdClass processed data object
     */
    public function define_save_preprocess($data) {
        $data->name = $data->shortname = $data->network;
        unset($data->network);
        return $data;
    }

}