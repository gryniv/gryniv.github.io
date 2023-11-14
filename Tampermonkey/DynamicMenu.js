// ==UserScript==
// @name         JSON-based Dynamic Menu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Ihor Hryniv @doctors
// @description  Create a dropdown menu with submenus from JSON data loaded from an external URL
// @match        https://*.techwave.hu/*
// @match        https://*.local:9002/*
// @match        https://techwave.jetbrains.space/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
    'use strict';

    // Function to handle keypress
    function handleKeyPress(e) {
        if (e.key === 'Escape') { // Check if the "Esc" key is pressed
            console.log("Escape key pressed");
            changePosition();
            // Query the element containing the code block
            const codeBlock = document.querySelector('.dropdown-menu-container');

            // Toggle the hidden class
            if (codeBlock) {
                codeBlock.classList.toggle('show-menu');
            }
        }
    }

    function changePosition() {
        // Example: Select by class name
        var elements = document.getElementsByClassName('mainWidgetSlot');
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains('widget_cnt')) { // Additional check if needed
                elements[i].style.position = 'unset';
            }
        }
        // Add more selectors here if needed
    }


    // Optional: Observer for AJAX or dynamic content
    var observer = new MutationObserver(function () {
        changePosition();
    });
    observer.observe(document.body, {childList: true, subtree: true});
    // Add event listener for keypress
    document.addEventListener('keydown', handleKeyPress);


    // Your main script to create the menu
    function mainScript() {
        // URL of the external JSON file containing menu data
        const menuUrl = 'https://raw.githubusercontent.com/gryniv/gryniv.github.io/main/Tampermonkey/menu.json'; // Replace with the actual URL of your JSON file

        function fetchMenuData(url, callback) {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: function (response) {
                    if (response.status === 200) {
                        const menuData = JSON.parse(response.responseText);
                        callback(menuData);
                    } else {
                        console.error('Failed to fetch menu data.');
                    }
                }
            });
        }

        /**
         * Creates a dropdown menu from a JSON structure.
         * @param {Array} menuData - The JSON data for menu creation.
         */
        function createMenuFromJSON(menuData) {
            const menuContainer = document.createElement('div');
            menuContainer.className = 'dropdown-menu-container';

            // Process each menu item.
            menuData.forEach(item => {
                if (item.separator) {
                    addSeparatorTo(menuContainer);
                } else if (item.submenu) {
                    addSubmenuTo(menuContainer, item);
                } else {
                    addMenuItemTo(menuContainer, item);
                }
            });

            // Insert the menu at the beginning of the body.
            document.body.insertBefore(menuContainer, document.body.firstChild);
        }

        /**
         * Adds a separator to the given container.
         * @param {HTMLElement} container - The container to add the separator to.
         */
        function addSeparatorTo(container) {
            const separator = document.createElement('div');
            separator.className = 'menu-separator';
            container.appendChild(separator);
        }

        /**
         * Adds a submenu to the given container.
         * @param {HTMLElement} container - The container to add the submenu to.
         * @param {Object} item - The submenu item data.
         */
        function addSubmenuTo(container, item) {
            const submenuContainer = document.createElement('div');
            submenuContainer.className = 'submenu-container';

            const menuItem = createMenuItem(item);
            submenuContainer.appendChild(menuItem);

            const submenu = createSubmenu(item.submenu);
            submenuContainer.appendChild(submenu);

            container.appendChild(submenuContainer);
        }

        /**
         * Creates and returns a menu item element.
         * @param {Object} item - The menu item data.
         * @return {HTMLElement} The created menu item element.
         */
        function createMenuItem(item) {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.textContent = item.label;

            if (item.submenu && item.submenu.length > 0) {
                const arrowIndicator = document.createElement('span');
                arrowIndicator.className = 'arrow-indicator';
                arrowIndicator.textContent = '\u25B6'; // Right arrow
                menuItem.appendChild(arrowIndicator);
            }

            return menuItem;
        }

        /**
         * Creates and returns a submenu element.
         * @param {Array} submenuItems - The submenu items data.
         * @return {HTMLElement} The created submenu element.
         */
        function createSubmenu(submenuItems) {
            const submenu = document.createElement('div');
            submenu.className = 'submenu';

            submenuItems.forEach(submenuItem => {
                const submenuLink = createSubmenuLink(submenuItem);
                submenu.appendChild(submenuLink);
            });

            return submenu;
        }

        /**
         * Creates and returns a submenu link element.
         * @param {Object} submenuItem - The submenu item data.
         * @return {HTMLElement} The created submenu link element.
         */
        function createSubmenuLink(submenuItem) {
            const submenuLink = document.createElement('a');
            submenuLink.href = submenuItem.url;
            submenuLink.textContent = submenuItem.label;
            submenuLink.className = 'submenu-item';

            return submenuLink;
        }

        /**
         * Adds a standard menu item to the given container.
         * @param {HTMLElement} container - The container to add the item to.
         * @param {Object} item - The menu item data.
         */
        function addMenuItemTo(container, item) {
            const menuItem = document.createElement('a');
            menuItem.href = item.url;
            menuItem.textContent = item.label;
            menuItem.className = 'menu-item';
            container.appendChild(menuItem);
        }


        fetchMenuData(menuUrl, createMenuFromJSON);
    }

    // Load the main script
    mainScript();

    // Add the CSS styles to the head of the document
    const style = document.createElement('style');
    style.textContent = `
/* Style for the menu container */
.dropdown-menu-container {
    display: none; /* Use flexbox to create a horizontal layout */
    align-items: center; /* Center the items vertically */
    background-color: rgb(41, 45, 50);
}

/* Style for menu items */
.menu-item {
    position: relative; /* Set position to relative to accommodate the arrow */
    padding: 10px;
    display: inline-block;
    margin-right: 10px; /* Add some spacing between menu items */
    text-decoration-color: initial;
    color: rgb(168, 168, 168);
    background-color: rgb(41, 45, 50);
    border-color: rgb(55, 61, 67);
}
.menu-item:hover {
    background-color: #0058b7a6; /* Change to your desired hover background color */
    color: white; /* Change to your desired hover text color */
}

/* Style for the arrow indicator container */
.arrow-indicator-container {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 12px; /* Adjust the font size as needed */
    display: flex; /* Use flexbox to create a vertical layout */
    flex-direction: column; /* Display the arrow indicator below the text */
}

/* Style for the arrow indicator */
.arrow-indicator {
    margin-top: 2px; /* Add some spacing between the text and the arrow */
    padding-left: 10px;

}

/* Style for separators */
.menu-separator {
    margin: 5px 0;
    border-top: 1px solid #ddd;
}

/* Style for submenu container */
.submenu-container {
    position: relative;
    display: inline-block;

}

/* Style for submenu trigger */
.submenu-container:hover .submenu {
    display: block;
}

/* Style for submenu */
.submenu {
    display: none;
    position: absolute;
    color: rgb(168, 168, 168);
    padding: 10px;
    top: 100%;
    left: 0;
    z-index: 1;
    width: max-content;
    background-color: rgb(35, 39, 43);
    border-color: rgb(55, 61, 67);
}

/* Style for submenu items */
.submenu-item {
color: rgb(168, 168, 168);
    text-decoration: none;
    display: block; /* Display submenu items in one line */
    padding: 5px 10px;
}


/* Hover effect for submenu items */
.submenu-item:hover {
    color: rgb(123, 168, 255);
      text-decoration: underline;
}

.show-menu {
    display: block;
    position: fixed;
    z-index: 1000;
}
    `;

    document.head.appendChild(style);


})();