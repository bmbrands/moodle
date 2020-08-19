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
 * Moodle Component Library
 *
 * Serves the Hugo docs html pages.
 *
 * @package    theme_arupboost
 * @copyright  2020 Bas Brands <bas@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

// we need just the values from config.php and minlib.php
require_once(__DIR__ . '/../../config.php');
require_once($CFG->dirroot . '/lib/filelib.php');


$PAGE->set_pagelayout('course');
$thispageurl = new moodle_url('/theme/arupboost/icons.php');
$PAGE->set_url($thispageurl, $thispageurl->params());
$PAGE->set_context(context_system::instance());
$title = get_string('pluginname', 'theme_arupboost');
$PAGE->set_heading($title);
$PAGE->set_title($title);


echo $OUTPUT->header();

$isfontawesome = \core\output\icon_system::instance(\core\output\icon_system::FONTAWESOME);
$map = $isfontawesome->get_core_icon_map();
$icons = [];

foreach ($map as $name => $icon) {
    $parts = explode(':', $name);

    $imageicon = new image_icon($parts[1], $name, $parts[0], []);
    $i = new \stdClass();
    $i->name = $name;
    $i->icon = $icon;

    $icons[] = $i;
    $rendered = $OUTPUT->pix_icon($parts[1], $icon, $parts[0]);
    echo "<div class='border p-1 mb-2'> $rendered $parts[0] $parts[1] : $icon <i class='fa $icon'></i></div>";
}

echo $OUTPUT->footer();
