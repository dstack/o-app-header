/*global sinon, describe, it, before, beforeEach*/
'use strict';

var expect = require('expect.js');

var AppHeader = require('./../src/js/AppHeader');

describe('AppHeader', function () {

	var sandbox, session;

	before(function () {
		sandbox = sinon.sandbox.create();
		session = window.session = {
			login: function (redirectUrl) {},
			logout: function (redirectUrl) {}
		};

		var configEl = document.createElement('script');
		configEl.setAttribute('data-o-app-header-config', '');
		configEl.type = 'application/json';
		configEl.innerHTML = JSON.stringify({ sessionGlobal: 'session' });
		document.head.appendChild(configEl);
	});

	beforeEach(function () {
		document.body.innerHTML = '';
		sandbox.restore();
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

	describe('session', function () {

		var headerEl;

		beforeEach(function () {
			AppHeader.init();
			headerEl = getHeaderEl();
		});

		it('should sign the user in when the Sign In nav item is clicked', function (done) {
			var signInEl = headerEl.querySelector('[data-link="sign-in"]');
			sinon.stub(session, 'login');

			dispatchEvent(signInEl, 'click');

			setTimeout(function () {
				expect(session.login.calledWith(window.location.href)).to.be(true);
				done();
			});
		});

		it('should sign the user out when the Sign Out dropdown menu item is clicked', function (done) {
			var signOutEl = headerEl.querySelector('[data-link="sign-out"]');
			sinon.stub(session, 'logout');

			dispatchEvent(signOutEl, 'click');

			setTimeout(function () {
				expect(session.logout.calledWith(window.location.href)).to.be(true);
				done();
			});
		});

	});

});

function dispatchEvent(element, name, data) {
	if (document.createEvent && element.dispatchEvent) {
		var event = document.createEvent('Event');
		event.initEvent(name, true, true);

		if (data) {
			event.detail = data;
		}

		element.dispatchEvent(event);
	}
}

function getHeaderEl() {
	return document.querySelector('[data-o-component="o-header"]');
}
