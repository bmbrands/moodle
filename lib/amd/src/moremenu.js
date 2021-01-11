const selectors = {
    actions: {
        more: '[data-action="moremenumore"]',
    },
    regions: {
        list: '[data-region="moremenulistitems"]',
        popup: '[data-region="moremenupopup"]',
        moremenu: '[data-region="moremenu"]',
    },
    classes: {
        observed: 'observed',
        listitem: '.nav-item',
        itemmoremenu: 'itemoverflow',
        hidden: 'd-none',
    }
};

const init = menu => {
    const list = menu.querySelector(selectors.regions.list);
    const popup = menu.querySelector(selectors.regions.popup);
    const moreButton = menu.querySelector(selectors.actions.more);

    moreButton.addEventListener('click', () => {
        if (popup.classList.contains(selectors.classes.hidden)) {
            showPopup(menu);
        } else {
            hidePopup(menu);
        }
    });

    // Close the popup on click outside.
    window.addEventListener('click', (e) => {
        if (!e.target.matches('.morenav a')) {
            hidePopup(menu);
        }
    });

    if ('IntersectionObserver' in window) {
        list.classList.add(selectors.classes.observed);
        const items = list.querySelectorAll(selectors.classes.listitem);
        const observerSettings = {
            root: list,
            threshold: 0.98
        };

        const callback = (items) => {
            [].forEach.call(items, (item) => {
                if (item.intersectionRatio > 0.98) {
                    item.target.classList.remove(selectors.classes.itemmoremenu);
                } else {
                    item.target.classList.add(selectors.classes.itemmoremenu);
                }

                const moreElems = list.querySelectorAll('.' + selectors.classes.itemmoremenu);
                const moreElemsArray = [].slice.call(moreElems);
                if (moreElemsArray.length > 0) {
                    moreButton.classList.remove(selectors.classes.hidden);
                    var moreElemStrings = moreElemsArray.map(function (i) {
                        return i.outerHTML;
                    });
                    popup.innerHTML = moreElemStrings.join('');
                } else {
                    moreButton.classList.add(selectors.classes.hidden);
                    hidePopup(menu);
                    popup.innerHTML = '';
                }
            });
        };

        const observer = new IntersectionObserver(callback, observerSettings);

        [].forEach.call(items, function (item) {
            observer.observe(item);
        });
    }
};

const showPopup = (menu) => {
    const popup = menu.querySelector(selectors.regions.popup);
    const moreButton = menu.querySelector(selectors.actions.more);

    moreButton.setAttribute('aria-expanded', 'true');
    popup.classList.remove(selectors.classes.hidden);
};

const hidePopup = (menu) => {
    const popup = menu.querySelector(selectors.regions.popup);
    const moreButton = menu.querySelector(selectors.actions.more);

    moreButton.setAttribute('aria-expanded', 'false');
    popup.classList.add(selectors.classes.hidden);
};

export default {
    init: init,
};
