'use strict';

module.exports = UserProfile;

function UserProfile(options) {
	options = options || {};
	this.baseUrl = options.baseUrl || 'https://console.pearson.com/api/token/';
	this.session = options.session;
}

UserProfile.prototype.fetch = function (callback) {
	if (typeof callback !== 'function') throw new TypeError('expected callback argument to be a function');

	var session = this.session;

	session.getToken(function (status, token) {
		if (status !== session.Success) return callback(new Error(status));
		// TODO: fetch user profile
	});
};
