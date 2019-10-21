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
 * Atto_hvp ajax.
 *
 * Renders text with the active filters and returns it. Used to create previews of equations
 * using whatever tex filters are enabled.
 *
 * @package    atto_h5p
 * @copyright  2019 Bas Brands <bas@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define('AJAX_SCRIPT', true);

require_once(__DIR__ . '/../../../../../config.php');

$url = required_param('url', PARAM_URL);
$contextid = required_param('contextid', PARAM_INT);

list($context, $course, $cm) = get_context_info_array($contextid);
$PAGE->set_url('/lib/editor/atto/plugins/h5p/ajax.php');
$PAGE->set_context($context);

require_login($course, false, $cm);
require_sesskey();

$action = required_param('action', PARAM_ALPHA);

if ($action === 'getfileinfo') {

    // Decode the URL before start processing it.
    // Sample Url: "http://moodlehost.com/draftfile.php/5/user/draft/834611742/find-the-hotspot.h5p?time=1570615806573".
    $url = new moodle_url(urldecode($url));

    // Remove params from the URL (such as the 'time=15706..'), to avoid errors.
    $url->remove_params(array_keys($url->params()));
    $path = $url->out_as_local_url();

    $parts = explode('/', $path);
    $filename = array_pop($parts);

    // First is an empty row and then the draftfile.php part. Both can be ignored.
    array_shift($parts);
    array_shift($parts);

    $contextid = array_shift($parts);

    // Component is always user.
    array_shift($parts);
    $component = 'user';

    // Filarea is always draft.
    array_shift($parts);
    $filearea = 'draft';

    $itemid = array_shift($parts);
    $filepath = DIRECTORY_SEPARATOR;

    $fs = get_file_storage();
    $file = $fs->get_file($contextid, $component, $filearea, $itemid, $filepath, $filename);

    echo $OUTPUT->header();
    if ($file) {
        $fileinfo = new stdClass();
        $fileinfo->size = $file->get_filesize();
        $fileinfo->contenthash = $file->get_contenthash();
        echo json_encode($fileinfo);
    }
    die();
}

print_error('invalidarguments');