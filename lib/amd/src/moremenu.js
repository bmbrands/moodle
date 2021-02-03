import {classUtil} from 'core/utils';

const selectors = {
    regions: {
        moredropdown: '[data-region="moredropdown"]',
    },
    classes: {
        nav: 'nav',
        navlink: 'nav-link',
        dropdownitem: 'dropdown-item',
        dropdownmoremenu: 'dropdownmoremenu',
        observed: 'observed',
        hidden: 'd-none',
    }
};

const autocollapse = (container) => {

    const menu = container.querySelector('.' + selectors.classes.nav);

    let navHeight = menu.offsetHeight;
    const maxHeight = container.offsetHeight;

    const dropdownMenu = menu.querySelector(selectors.regions.moredropdown);
    const dropdown = menu.querySelector('.' + selectors.classes.dropdownmoremenu);

    if (navHeight > maxHeight) {

        dropdown.classList.remove(selectors.classes.hidden);

        if ('children' in menu) {
            const menuNodes = Array.from(menu.children).reverse();
            menuNodes.forEach( (item) => {
                if (!item.classList.contains(selectors.classes.dropdownmoremenu)) {
                    if (menu.offsetHeight > maxHeight) {
                        const lastNode = menu.removeChild(item);
                        const navLink = lastNode.querySelector('.' + selectors.classes.navlink);
                        classUtil('replace', navLink, selectors.classes.navlink, selectors.classes.dropdownitem);
                        dropdownMenu.prepend(lastNode);
                    }
                }
            });
        }
    }
    else {
        dropdown.classList.add(selectors.classes.hidden);

        if ('children' in dropdownMenu) {
            const menuNodes = Array.from(dropdownMenu.children);
            menuNodes.forEach( (item) => {
                if (menu.offsetHeight < maxHeight) {
                    const lastNode = dropdownMenu.removeChild(item);
                    const navLink = lastNode.querySelector('.' + selectors.classes.dropdownitem);
                    classUtil('replace', navLink, selectors.classes.dropdownitem, selectors.classes.navlink);
                    menu.insertBefore(lastNode, dropdown);
                }
            });
        }

        navHeight = menu.offsetHeight;
        if (navHeight > maxHeight) {
            autocollapse(container);
        }
    }
    classUtil('add', container, selectors.classes.observed);
};

const init = container => {
    // when the page loads
    autocollapse(container);

    // when the window is resized
    window.addEventListener('resize', function () {
        autocollapse(container);
    });
};

export default {
    init: init,
};
