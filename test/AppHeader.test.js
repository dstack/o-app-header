/*global describe, it, beforeEach*/
'use strict';

var expect = require('expect.js');

var AppHeader = require('./../src/js/AppHeader');

describe('AppHeader', function () {

	beforeEach(function () {
		document.body.innerHTML = '';
	});

	describe('o.DOMContentLoaded', function () {

		require('../main');

		it('should prepend to document.body', function (done) {
			document.addEventListener('o.DOMContentLoaded', function () {
				var appHeaderEl = document.body.firstChild;

				expect(document.body.children.length).to.be(1);
				expect(appHeaderEl).to.not.be(null);
				expect(appHeaderEl.nodeName.toLowerCase()).to.be('header');
				done();
			});

			var ready = document.createEvent('Event');
			ready.initEvent('o.DOMContentLoaded');
			document.dispatchEvent(ready);
		});

	});

	describe('#init(element)', function () {

		it('should prepend to document.body when element is undefined', function () {
			AppHeader.init();

			var appHeaderEl = document.body.firstChild;

			expect(document.body.children.length).to.be(1);
			expect(appHeaderEl).to.not.be(null);
			expect(appHeaderEl.nodeName.toLowerCase()).to.be('header');
		});

		it('should replace element when element is an instance of HTMLElement', function () {
			document.body.appendChild(document.createElement('div'));

			var el = document.createElement('div');
			document.body.appendChild(el);

			AppHeader.init(el);

			var appHeaderEl = document.body.childNodes[1];

			expect(document.body.children.length).to.be(2);
			expect(appHeaderEl).to.not.be(null);
			expect(appHeaderEl.nodeName.toLowerCase()).to.be('header');
		});

		it('should replace element when element is an instance of string', function () {
			document.body.appendChild(document.createElement('div'));

			var el = document.createElement('div');
			el.id = 'app-header';
			document.body.appendChild(el);

			AppHeader.init('#app-header');

			var appHeaderEl = document.body.childNodes[1];

			expect(document.body.children.length).to.be(2);
			expect(appHeaderEl).to.not.be(null);
			expect(appHeaderEl.nodeName.toLowerCase()).to.be('header');
		});

		it('should set aria-role="banner"', function () {
			AppHeader.init();

			var appHeaderEl = getHeaderEl();

			expect(appHeaderEl.getAttribute('aria-role')).to.be('banner');
		});

		it('should resolve the nav links', function () {
			var consoleBaseUrl = 'https://example.org';
			AppHeader.init({ consoleBaseUrl: consoleBaseUrl });

			var appHeaderEl = getHeaderEl();

			function resolveLink(key) {
				return AppHeader.linkMap[key].replace('{consoleBaseUrl}', consoleBaseUrl);
			}

			expect(appHeaderEl.querySelector('[data-link="my-account"]').href).to.be(resolveLink('my-account'));
			expect(appHeaderEl.querySelector('[data-link="tech-support"]').href).to.be(resolveLink('tech-support'));
			expect(appHeaderEl.querySelector('[data-link="my-courses"]').href).to.be(resolveLink('my-courses'));
		});

	});

});

function getHeaderEl() {
	return document.querySelector('[data-o-component="o-header"]');
}
