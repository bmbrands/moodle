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
 * Contains class used to render the message area.
 *
 * @package    core_message
 * @copyright  2016 Mark Nelson <markn@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace core_message\output;

defined('MOODLE_INTERNAL') || die();

use plugin_renderer_base;

/**
 * Renderer class for the message area.
 *
 * @package    core_message
 * @copyright  2016 Mark Nelson <markn@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class renderer extends plugin_renderer_base {

    /**
     * Renders the message area.
     *
     * Defer to template.
     *
     * @param \core_message\output\messagearea\message_area $page
     * @return string html for the page
     */
    public function render_message_area(\core_message\output\messagearea\message_area $page) {
        $data = $page->export_for_template($this);
        return parent::render_from_template('core_message/message_area', $data);
    }

        /**
     * Display the interface for notification preferences
     *
     * @param object $user instance of a user
     * @return string The text to render
     */
    public function render_user_notification_preferences($user) {
        $processors = get_message_processors();
        $providers = message_get_providers_for_user($user->id);

        $preferences = \core_message\api::get_all_message_preferences($processors, $providers, $user);
        $notificationlistoutput = new \core_message\output\preferences\notification_list($processors, $providers,
            $preferences, $user);
        return parent::render_from_template('core_message/notification_preferences',
            $notificationlistoutput->export_for_template($this));
    }

    /**
     * Display the interface for message preferences
     *
     * @param object $user instance of a user
     * @return string The text to render
     */
    public function render_user_message_preferences($user) {
        // Filter out enabled, available system_configured and user_configured processors only.
        $readyprocessors = array_filter(get_message_processors(), function($processor) {
            return $processor->enabled &&
                $processor->configured &&
                $processor->object->is_user_configured() &&
                // Filter out processors that don't have and message preferences to configure.
                $processor->object->has_message_preferences();
        });

        $providers = array_filter(message_get_providers_for_user($user->id), function($provider) {
            return $provider->component === 'moodle';
        });
        $preferences = \core_message\api::get_all_message_preferences($readyprocessors, $providers, $user);
        $notificationlistoutput = new \core_message\output\preferences\message_notification_list($readyprocessors,
            $providers, $preferences, $user);
        $context = $notificationlistoutput->export_for_template($this);
        $context['blocknoncontacts'] = get_user_preferences('message_blocknoncontacts', '', $user->id) ? true : false;

        return parent::render_from_template('core_message/message_preferences', $context);
    }
}