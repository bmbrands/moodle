<?php
// This file is part of the Don't Memorise Dashboard block
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
 * @package    block
 * @subpackage dashboard
 * @copyright  2015 Bas Brands, bas@sonsbeekmedia.nl
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once '../../config.php';

$context = context_system::instance();

$PAGE->set_context($context);
$PAGE->set_url('/lib/geopattern-php/index.php');
$PAGE->set_heading('TEST');
$PAGE->set_pagelayout('base');
$PAGE->set_title('My Dashboard');
$PAGE->navbar->add('My Dashboard');

$compiler = new \core_geopattern();

echo $OUTPUT->header();

echo $compiler->coursepattern();


echo 'hoi';

echo $OUTPUT->footer();