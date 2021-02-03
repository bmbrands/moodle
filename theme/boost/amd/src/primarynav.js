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
 * Toggling the visibility of the primary navigation on mobile.
 *
 * @package    theme_boost
 * @copyright  2021 Bas Brands
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {classUtil} from 'core/utils';
import ModalBackdrop from 'core/modal_backdrop';
import Templates from 'core/templates';

let backdropPromise = 0;

const getBackdrop = function() {
    if (!backdropPromise) {
        backdropPromise = Templates.render('core/modal_backdrop', {})
            .then(function(html) {
                return new ModalBackdrop(html);
            })
            .fail(Notification.exception);
    }

    return backdropPromise;
};

export const togglenavigation = () => {
    const primarynav = document.querySelector('#primarynav');
    const toggleButton = document.querySelector('#primarynavtoggle');
    const closeButton = document.querySelector('#primarynavclose');
    const page = document.querySelector('#page-wrapper');

    if (primarynav && toggleButton) {
        toggleButton.addEventListener('click', () => {
            classUtil('toggle', primarynav, 'show');
            classUtil('toggle', closeButton, 'd-none');

            getBackdrop().then(backdrop => {
                if (classUtil('has', primarynav, 'show')) {
                    backdrop.setZIndex(1020);
                    backdrop.show();
                    page.style.overflow = 'hidden';
                } else {
                    backdrop.hide();
                    page.style.overflow = 'auto';
                }
            });
        });
    }
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            classUtil('toggle', primarynav, 'show');
            classUtil('toggle', closeButton, 'd-none');
            getBackdrop().then(backdrop => {
                backdrop.hide();
                page.style.overflow = 'auto';
            });
        });
    }
};
