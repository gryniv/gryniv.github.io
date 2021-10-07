// ==UserScript==
// @name         HybrisCssFix
// @namespace    https://gryniv.github.io/
// @version      0.1.3
// @description  Fix some css styles on Hybris environments for better user experience
// @author       Ihor Hryniv @doctors
// @icon        https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqTBoTlCF0AQRFBStwe8tW0DREaKpvn_oDnTGj6eJvZ0QKMcp_tpLb4SB_rvAKZ2H-O_E&usqp=CAU
//               local
// @include      https://localhost*
// @include      https://amway.ru.local*
// @match        https://localhost*
//         FQA test
// @include      https://admin-fqa5.hybris.eia.amway.net/*
// @include      https://admin-fqa6.hybris.eia.amway.net/*
// @include      https://admin-fqa7.hybris.eia.amway.net/*
// @include      https://admin-fqa8.hybris.eia.amway.net/*
// @include      https://admin-fqa9.hybris.eia.amway.net/*
// @include      https://admin-fqa10.hybris.eia.amway.net/*
// @match        https://admin-fqa5.hybris.eia.amway.net/*
// @match        https://admin-fqa6.hybris.eia.amway.net/*
// @match        https://admin-fqa7.hybris.eia.amway.net/*
// @match        https://admin-fqa8.hybris.eia.amway.net/*
// @match        https://admin-fqa9.hybris.eia.amway.net/*
// @match        https://admin-fqa10.hybris.eia.amway.net/*
//         UAT
// @include      https://bo.uat.amway.ru/*
// @include      https://bo.uat.kz.amway.com/*
// @match        https://bo.uat.amway.ru/*
// @match        https://bo.uat.kz.amway.com/*
//         FQA
// @include      https://bo.fqa.amway.ru/*
// @include      https://bo.fqa.kz.amway.com/*
// @match        https://bo.fqa.amway.ru/*
// @match        https://bo.fqa.kz.amway.com/*
//         PROD
// @include      https://bo.amway.ru/*
// @include      https://bo.kz.amway.com/*
// @match        https://bo.amway.ru/*
// @match        https://bo.kz.amway.com/*
// ==/UserScript==

const prodEnv = ['bo.amway.ru', 'bo.kz.amway.com'];

(function () {
    const url = document.URL;
    backofficeUpdate(url);
    hacUpdate(url);
    // addMenu();


})();

function addMenu() {
    addGlobalStyle('.ullistClass {list-style-type: none;margin: 0;  padding: 0;  overflow: hidden;  background-color: #333;}' +
        '.listClass {  float: left;}' +
        'li a, .dropbtn {  display: inline-block;  color: white;  text-align: center;  padding: 14px 16px;  text-decoration: none;}' +

        'li.dropdown {  display: inline-block;}' +
        '.dropdown-content {  display: none;  position: absolute;  background-color: #f9f9f9;  min-width: 160px;  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);  z-index: 1;}' +
        '.dropdown-content a {  color: black;  padding: 12px 16px;  text-decoration: none;  display: block;  text-align: left;}' +
        '.dropdown-content a:hover {background-color: #f1f1f1;}' +
        '.dropdown:hover .dropdown-content {  display: block;}');
    const newHTML = document.createElement('div');
    newHTML.innerHTML = '<ul class="ullistClass">' +
        '  <li class="listClass"><a href="#home">Home</a></li>' +
        '  <li class="listClass"><a href="#news">News</a></li>' +
        '  <li class="dropdown listClass">' +
        '    <a href="javascript:void(0)" class="dropbtn">Dropdown</a>' +
        '    <div class="dropdown-content">' +
        '      <a href="#">Link 1</a>' +
        '      <a href="#">Link 2</a>' +
        '      <a href="#">Link 3</a>' +
        '    </div>' +
        '  </li>' +
        '</ul>';
    document.body.firstElementChild.before(newHTML);
}


function backofficeUpdate(url) {
    if (url.includes("/backoffice")) {
        if (isProduction(url)) {
            addGlobalStyle('div.yw-systemBarContainer.z-div{ background-color: #cc0000 !important; }');
        }
        addGlobalStyle('div.yw-modal-collectionEditorAreaGroup.z-window.z-window-noborder.z-window-highlighted.z-window-shadow{ width: 1500px !important; }');
    }
}

//test
function hacUpdate(url) {
    if (url.includes("/hac")) {
        updateHacStyles()
        changeColor()
        //addHacFlexibleSearchSamples()
    }
}

function addHacFlexibleSearchSamples() {
    const a = document.getElementById("recent-reviews")
    const newHTML = document.createElement('ul');
    newHTML.className = "box"
    newHTML.innerHTML = '<ul class="ullistClass">' +
        `<li><input type="text" value=""SELECT {pk}, {code},{name[de]} FROM {Product}"" id="myInput">

<!-- The button used to copy the text -->
<button onclick="copyToClipboard()">Copy text</button>

	</a></li>`
    a.getElementsByClassName("box")[0].firstElementChild.before(newHTML)
}

function updateHacStyles() {
    addGlobalStyle('div.container{ width: 80% !important; }');
    addGlobalStyle('header.span-24.last{ width: 100% !important; }');
    addGlobalStyle('nav.subnavigation.span-24.last{ width: 100% !important; }');
    addGlobalStyle('div.ui-resizable{min-height:250px; width: unset !important; height: unset !important}');
    addGlobalStyle('div.CodeMirror-sizer{min-height:250px !important;}');
    addGlobalStyle('div.prepend-top.span-17.colborder{ width: 82% !important; }');
    addGlobalStyle('div.prepend-top.span-24.last{ width: 100% !important; }');
    addGlobalStyle('div.span-24.last{ width: 100% !important; }');
    addGlobalStyle('div.span-6.last{ width: 13% !important; }');

}

function changeColor() {
    let elementToBeSearched = document.querySelector("tbody");

// Begin traversing the child elements as an array
    Array.prototype.slice.call(elementToBeSearched.children).forEach(function (node) {
        // Replace keywords with span elements that are tied to the correct CSS class.
        node.innerHTML = node.innerHTML.replace(/SUCCESS/g, "<span style='text-color=green'>SUCCESS</span>");
        node.innerHTML = node.innerHTML.replace(/Offer/g, "<span class='offer'>Offer</span>");
    });
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function isProduction(url) {
    for (const value of prodEnv) {
        if (url.includes(value)) {
            return true;
        }
    }
    return false;
}


function copyToClipboard() {
    /* Get the text field */
    var copyText = document.getElementById("myInput");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
}
