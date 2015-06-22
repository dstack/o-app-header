'use strict';

exports.forEach = function (array, callback) {
	for (var i = 0, l = array.length; i < l; i++) {
		callback.call(this, i, array[i]);
	}
};
