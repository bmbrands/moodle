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

const getBackdrop = () => {
    if (!backdropPromise) {
        backdropPromise = Templates.render('core/modal_backdrop', {})
            .then(function(html) {
                return new ModalBackdrop(html);
            })
            .fail(Notification.exception);
    }
    return backdropPromise;
};

const sel = {
    ids: {
        primarynav: '#primarynav',
        togglebutton: '#primarynavtoggle',
        pagecontent: '#page-wrapper',
        closebutton: '#primarynavclose'
    }
};

const closeNav = () => {
    const primarynav = document.querySelector(sel.ids.primarynav);
    const pageContent = document.querySelector(sel.ids.pagecontent);
    classUtil('remove', primarynav, 'show');
    getBackdrop().then(backdrop => {
        backdrop.hide();
        pageContent.style.overflow = 'auto';
    });
};

const showNav = () => {
    const primarynav = document.querySelector(sel.ids.primarynav);
    const pageContent = document.querySelector(sel.ids.pagecontent);
    classUtil('add', primarynav, 'show');
    getBackdrop().then(backdrop => {
        backdrop.setZIndex(1020);
        backdrop.show();
        pageContent.style.overflow = 'hidden';
    });
};

export const togglenavigation = () => {
    const toggleButton = document.querySelector(sel.ids.togglebutton);
    const closeButton = document.querySelector(sel.ids.closebutton);
    const primarynav = document.querySelector(sel.ids.primarynav);

    if (toggleButton && closeButton) {
        toggleButton.addEventListener('click', () => {
            if (classUtil('has', primarynav, 'show')) {
                closeNav();
            } else {
                showNav();
            }
        });
    }
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            closeNav();
        });
    }

    window.addEventListener('resize', function () {
        if (window.outerWidth > 992) {
            closeNav();
        }
    });
};
