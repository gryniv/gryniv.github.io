// ==UserScript==
// @name         HybrisCssFix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.tampermonkey.net/index.php?version=4.13&ext=dhdg&updated=true&show=dhdg
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// @include      https://localhost*
// @include      https://bo.fqa.amway.ru/*
// @include      https://bo.fqa.kz.amway.com/*
// @include      https://bo.amway.ru/*
// @include      https://bo.kz.amway.com/*
// @include      https://admin-fqa5.hybris.eia.amway.net/*
// @include      https://admin-fqa6.hybris.eia.amway.net/*
// @include      https://admin-fqa7.hybris.eia.amway.net/*
// @include      https://admin-fqa8.hybris.eia.amway.net/*
// @include      https://admin-fqa9.hybris.eia.amway.net/*
// @include      https://admin-fqa10.hybris.eia.amway.net/*
// @include      https://bo.uat.amway.ru/*
// @include      https://bo.uat.kz.amway.com/*
// ==/UserScript==

const prodEnv = ['bo.amway.ru', 'bo.kz.amway.com'];


(function () {
    const url = document.URL;
    backofficeUpdate(url);
    hacUpdate(url);


})();

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

//test
function replaceProd() {
    const newHTML = document.createElement('div');
    newHTML.innerHTML = '<div class"yw-logoContainer z-div" style="font-size: 30px">Some paragraph</div>';
    document.querySelectorAll('div.yw-statusToolbar.yw-statusToolbar-left.z-div')[0].replaceWith(newHTML);
}

function backofficeUpdate(url) {
    if (url.includes("/backoffice")) {
        addGlobalStyle('.z-window{ width: 1500px !important; }');
        if (isProduction(url)) {
            addGlobalStyle('div.yw-systemBarContainer.z-div{ background-color: #cc0000 !important; }');
            replaceProd();
        }
    }

}

function hacUpdate(url) {
    if (url.includes("/hac")) {
        addGlobalStyle('div.prepend-top.span-17.colborder{ width: 669px !important; }');
    }

}