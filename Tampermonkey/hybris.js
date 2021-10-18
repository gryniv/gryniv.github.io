// ==UserScript==
// @name         HybrisCssFix
// @namespace    https://gryniv.github.io/
// @version      0.1.4
// @description  Fix some css styles on Hybris environments for better user experience
// @author       Ihor Hryniv @doctors
// @icon        https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqTBoTlCF0AQRFBStwe8tW0DREaKpvn_oDnTGj6eJvZ0QKMcp_tpLb4SB_rvAKZ2H-O_E&usqp=CAU
// @updateURL    https://gryniv.github.io/Tampermonkey/hybris.js
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
})();

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
    }
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
