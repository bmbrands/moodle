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
 * Content bank UI actions.
 *
 * @module     core_contentbank/sort
 * @package    core_contentbank
 * @copyright  2020 Bas Brands <bas@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import selectors from 'core_contentbank/selectors';
import {get_string as getString} from 'core/str';

/**
 * Set up the contentbank views.
 *
 * @method init
 */
export const init = () => {
    const contentBank = document.querySelector(selectors.regions.contentbank);

    registerListenerEvents(contentBank);
};


/**
 * Register contentbank related event listeners.
 *
 * @method registerListenerEvents
 * @param {HTMLElement} contentBank The DOM node of the content bank
 */
const registerListenerEvents = (contentBank) => {

    // The search.
    const fileArea = document.querySelector(selectors.regions.filearea);
    const shownItems = fileArea.querySelectorAll(selectors.elements.listitem);

    // The view buttons.
    const viewGrid = contentBank.querySelector(selectors.actions.viewgrid);
    const viewList = contentBank.querySelector(selectors.actions.viewlist);

    viewGrid.addEventListener('click', () => {
        contentBank.classList.remove('view-list');
        contentBank.classList.add('view-grid');
        viewGrid.classList.add('active');
        viewList.classList.remove('active');
    });

    viewList.addEventListener('click', () => {
        contentBank.classList.remove('view-grid');
        contentBank.classList.add('view-list');
        viewList.classList.add('active');
        viewGrid.classList.remove('active');
    });

    // Sort by file name alphabetical
    const sortByName = contentBank.querySelector(selectors.actions.sortname);
    sortByName.addEventListener('click', () => {
        let ascending = updateSortButtons(contentBank, sortByName);
        updateSortOrder(fileArea, shownItems, 'data-file', ascending);
    });

    // Sort by date.
    const sortByDate = contentBank.querySelector(selectors.actions.sortdate);
    sortByDate.addEventListener('click', () => {
        let ascending = updateSortButtons(contentBank, sortByDate);
        updateSortOrder(fileArea, shownItems, 'data-timemodified', ascending);
    });

    // Sort by size.
    const sortBySize = contentBank.querySelector(selectors.actions.sortsize);
    sortBySize.addEventListener('click', () => {
        let ascending = updateSortButtons(contentBank, sortBySize);
        updateSortOrder(fileArea, shownItems, 'data-bytes', ascending);
    });

    // Sort by type
    const sortByType = contentBank.querySelector(selectors.actions.sorttype);
    sortByType.addEventListener('click', () => {
        let ascending = updateSortButtons(contentBank, sortByType);
        updateSortOrder(fileArea, shownItems, 'data-type', ascending);
    });
};

/**
 * Update the sort button view.
 *
 * @method updateSortButtons
 * @param {HTMLElement} contentBank The DOM node of the contentbank button
 * @param {HTMLElement} sortButton The DOM node of the sort button
 * @return {Bool} sort ascending
 */
const updateSortButtons = (contentBank, sortButton) => {
    const sortButtons = contentBank.querySelectorAll(selectors.elements.sortbutton);

    sortButtons.forEach((button) => {
        if (button !== sortButton) {
            button.classList.remove('dir-asc');
            button.classList.remove('dir-desc');
            button.classList.add('dir-none');
            let string = button.getAttribute('data-string');
            getString(string, 'contentbank').then((str) => {
                getString('sortbyx', 'core', str).then((title) => {
                    return button.setAttribute('title', title);
                });
            });
        }
    });

    let ascending = true;

    if (sortButton.classList.contains('dir-none')) {
        sortButton.classList.remove('dir-none');
        sortButton.classList.add('dir-asc');
    } else if (sortButton.classList.contains('dir-asc')) {
        sortButton.classList.remove('dir-asc');
        sortButton.classList.add('dir-desc');
        ascending = false;
    } else if (sortButton.classList.contains('dir-desc')) {
        sortButton.classList.remove('dir-desc');
        sortButton.classList.add('dir-asc');
    }

    let string = sortButton.getAttribute('data-string');
    if (ascending) {
        getString(string, 'contentbank').then((str) => {
            getString('sortbyxreverse', 'core', str).then((title) => {
                return sortButton.setAttribute('title', title);
            });
        });
    } else {
        getString(string, 'contentbank').then((str) => {
            getString('sortbyx', 'core', str).then((title) => {
                return sortButton.setAttribute('title', title);
            });
        });
    }
    return ascending;
};

/**
 * Update the sort order of the itemlist and update the DOM
 *
 * @method updateSortOrder
 * @param {HTMLElement} fileArea the Dom container for the itemlist
 * @param {Array} itemList Nodelist of Dom elements
 * @param {String} attribute, the attribut to sort on
 * @param {Bool} ascending, Sort Ascending
 */
const updateSortOrder = (fileArea, itemList, attribute, ascending) => {
    let sortList = [].slice.call(itemList).sort(function(a, b) {

        let aa = a.getAttribute(attribute);
        let bb = b.getAttribute(attribute);
        if (!isNaN(aa)) {
           aa = parseInt(aa);
           bb = parseInt(bb);
        }
        window.console.log(aa);

        if (ascending) {
            return aa > bb ? 1 : -1;
        } else {
            return aa < bb ? 1 : -1;
        }
    });
    sortList.forEach(function (listItem) {
        fileArea.appendChild(listItem);
    });
};