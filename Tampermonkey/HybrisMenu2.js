// ==UserScript==
// @name         JSON-based Dropdown Menu test
// @namespace    http://tampermonkey.net/
// @version      0.1
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
                codeBlock.classList.toggle('show');
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
        const menuUrl = 'https://raw.githubusercontent.com/gryniv/gryniv.github.io/main/Tampermonkey/menu6.json'; // Replace with the actual URL of your JSON file

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

        function createMenuFromJSON(menuData) {
            const menuContainer = document.createElement('div');
            menuContainer.className = 'dropdown-menu-container';

            menuData.forEach(item => {
                if (item.separator) {
                    const separator = document.createElement('div');
                    separator.className = 'menu-separator';
                    menuContainer.appendChild(separator);
                } else if (item.submenu) {
                    const submenuContainer = document.createElement('div');
                    submenuContainer.className = 'submenu-container';

                    const menuItem = document.createElement('div');
                    menuItem.className = 'menu-item';
                    menuItem.textContent = item.label;

                    if (item.submenu.length > 0) {
                        const arrowIndicator = document.createElement('span');
                        arrowIndicator.className = 'arrow-indicator';
                        arrowIndicator.textContent = '\u25B6'; // Right arrow
                        menuItem.appendChild(arrowIndicator);
                    }

                    submenuContainer.appendChild(menuItem);

                    const submenu = document.createElement('div');
                    submenu.className = 'submenu';
                    item.submenu.forEach(submenuItem => {
                        const submenuLink = document.createElement('a');
                        submenuLink.href = submenuItem.url;
                        submenuLink.textContent = submenuItem.label;
                        submenuLink.className = 'submenu-item';
                        submenu.appendChild(submenuLink);
                    });
                    submenuContainer.appendChild(submenu);

                    menuContainer.appendChild(submenuContainer);
                } else {
                    const menuItem = document.createElement('a');
                    menuItem.href = item.url;
                    menuItem.textContent = item.label;
                    menuItem.className = 'menu-item';
                    menuContainer.appendChild(menuItem);
                }
            });

            document.body.insertBefore(menuContainer, document.body.firstChild);
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

.show {
    display: flex;
}
    `;

    document.head.appendChild(style);


})();