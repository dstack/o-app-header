'use strict';

var assign = require('object-assign/index');
var forEach = require('./utils').forEach;

var AppHeader = {

	defaultSettings: {
		sessionGlobal: 'piSession',
		consoleBaseUrl: 'https://console.pearson.com'
	},

	linkMap: {
		'my-account': '{consoleBaseUrl}/account/manage/account',
		'tech-support': 'https://247pearsoned.custhelp.com/app/answers/detail/a_id/13175',
		'my-courses': '{consoleBaseUrl}/console/home'
	},

	init: function (element, options) {
		if (typeof element === 'object' && !(element instanceof HTMLElement)) {
			options = element;
			element = null;
		}
		if (!element) element = document.body;
		if (!(element instanceof HTMLElement)) element = document.querySelector(element);

		var settings = getSettings();
		var headerEl = constructHeaderEl();

		if (element === document.body) {
			element.insertBefore(headerEl, element.firstChild);
		} else {
			// Replace the passed in element with the header element
			element.parentElement.insertBefore(headerEl, element);
			element.parentNode.removeChild(element);
		}

		function getSettings() {
			return assign({}, AppHeader.defaultSettings, getGlobalSettings(), options);
		}

		function getGlobalSettings() {
			var configEl = document.querySelector('[data-o-app-header-config]');
			var config = {};

			if (!configEl) return;
			try { config = JSON.parse(configEl.textContent); } catch (e) {}
			return config;
		}

		function resolveLink(key) {
			if (!AppHeader.linkMap[key]) return '';

			return AppHeader.linkMap[key]
				.replace('{consoleBaseUrl}', settings.consoleBaseUrl);
		}

		function constructHeaderEl() {
			var headerEl = document.createElement('header');

			headerEl.setAttribute('data-o-component', 'o-header');
			headerEl.setAttribute('aria-role', 'banner');
			headerEl.classList.add('o-header');
			headerEl.innerHTML = requireText('../html/header.html');

			// Links
			forEach(headerEl.querySelectorAll('[data-link]'), function (idx, item) {
				item.href = resolveLink(item.getAttribute('data-link'));
			});

			return headerEl;
		}

	}
};

module.exports = AppHeader;
