/*global require*/
require('../../main');

document.addEventListener('DOMContentLoaded', function() {
	'use strict';

	var sessionEventHandlers = {};
	var sessionState = 'nosession';

	window.session = {
		login: function (redirectUrl) {
			this.trigger(this.LoginEvent);
		},
		logout: function (redirectUrl) {
			this.trigger(this.LogoutEvent);
		},
		hasValidSession: function (gracePeriodSeconds) { return sessionState; },
		on: function (eventType, handler) {
			sessionEventHandlers[eventType] = sessionEventHandlers[eventType] || [];
			sessionEventHandlers[eventType].push(handler);
		},
		off: function (eventType, handler) {},
		trigger: function (eventType) {
			(sessionEventHandlers[eventType] || []).forEach(function (handler) {
				handler.call();
			});
		},
		// Events
		SessionStateKnownEvent: 'sessionstateknown',
		LoginEvent: 'login',
		LogoutEvent: 'logout',
		// States
		Unknown: 'unknown',
		NoSession: 'nosession',
		NoToken: 'notoken',
		RequiredLifetimeTooLong: 'requiredlifetimetoolong',
		Success: 'success',
		TimedOut: 'timedout'
	};

	window.userProfile = {
		fetch: function (callback) { return callback(null, { me: { profile: { firstName: 'John', lastName: 'Doe' } } }); }
	};

	var configEl = document.createElement('script');
	configEl.setAttribute('data-o-app-header-config', '');
	configEl.type = 'application/json';
	configEl.innerHTML = JSON.stringify({ session: 'session', userProfile: 'userProfile' });
	document.head.appendChild(configEl);

	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
