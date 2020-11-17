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
 * Contains upgrade and install functions for the social profile fields.
 *
 * @package    profilefield_social
 * @copyright  2020 Bas Brands <bas@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once("$CFG->dirroot/user/profile/definelib.php");

/**
 * Called on upgrade to create new profile fields based on the old user table columns
 * for icq, msn, aim, skype and url.
 */
function user_profile_social_moveto_profilefield($social) {
    global $DB;

    $users = $DB->get_records_select('user', "$social IS NOT NULL AND $social != ''");
    if (count($users)) {
        $profilefield = user_profile_social_create_profilefield($social);
        if ($profilefield) {
            foreach ($users as $user) {
                $userinfodata = [
                    'userid' => $user->id,
                    'fieldid' => $profilefield->id,
                    'data' => $user->$social,
                    'dataformat' => 0
                ];
                $user->$social = '';
                $DB->update_record('user', $user);
                $DB->insert_record('user_info_data', $userinfodata);
            }
        }
    }
}

/**
 * Check if there are no users left using this this table column.
 *
 * @return bool true if no users left.
 */
function user_profile_social_allmoved($social) {
    global $DB;

    $users = $DB->get_records_select('user', "$social IS NOT NULL AND $social != ''");
    if (count($users)) {
        return false;
    } else {
        return true;
    }
}

/**
 * Create an new custom social profile field if it does not exist
 *
 * @return object DB record or social profield field.
 */
function user_profile_social_create_profilefield($social) {
    global $DB;

    $newfield = (object)[
        'shortname' => $social,
        'name' => $social,
        'datatype' => 'social',
        'description' => '',
        'descriptionformat' => 1,
        'categoryid' => 1,
        'required' => 0,
        'locked' => 0,
        'visible' => 2,
        'forceunique' => 0,
        'signup' => 0,
        'defaultdata' => '',
        'defaultdataformat' => 0
    ];

    $profilefield = $DB->get_record('user_info_field', array('shortname' => $social));
    if (!$profilefield) {
        $profileclass = new profile_define_base();
        $profileclass->define_save($newfield);
        profile_reorder_fields();
        $profilefield = $DB->get_record('user_info_field', array('shortname' => $social));
    }
    return $profilefield;
}