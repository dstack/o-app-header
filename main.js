/*global require, module*/
'use strict';

var AppHeader = require('./src/js/AppHeader');

var construct = function () {
	AppHeader.init();
	document.removeEventListener('o.DOMContentLoaded', construct);
};

document.addEventListener('o.DOMContentLoaded', construct);

module.exports = AppHeader;
