/*global describe, it*/
'use strict';

var expect = require('expect.js');

var AppHeader = require('./../src/js/AppHeader');

describe('AppHeader', function() {

	it('should initialize', function () {
		expect(new AppHeader()).to.not.be(undefined);
	});

});
