'use strict';

exports.forEach = function (array, callback) {
	for (var i = 0, l = array.length; i < l; i++) {
		callback.call(this, i, array[i]);
	}
};

/**
 * Gets the value at `path` of `object`.
 * @param {[type]} object [description]
 * @param {[type]} path   [description]
 * @return {[type]}        [description]
 */
exports.get = function (object, path) {
	if (typeof object === 'undefined' || object === null) return;

	path = path.split('.');
	var index = 0;
	var length = path.length;

	while (object !== null && index < length) {
		object = object[path[index++]];
	}

	return (index && index === length) ? object : undefined;
};
