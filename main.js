/*global require, module*/
'use strict';

var AppHeader = require('./src/js/AppHeader');

var construct = function () {
	AppHeader.init();
	document.removeEventListener('o.DOMContentLoaded', construct);
};

document.addEventListener('o.DOMContentLoaded', construct);

module.exports = AppHeader;

/*
 	Initialization:

 	// Replace [data-o-component="o-app-header"]
 	// -or-
 	// prepend to document.body content
 	AppHeader.init();

 	// Replace element
 	AppHeader.init({HTMLElement} element);
	AppHeader.init({string} element);       // element = document.querySelector(element);

  // o.DOMContentLoaded
  AppHeader.init();

  Configuration

  <script data-o-app-header-config type="application/json">
    {
    	"sessionGlobal": "piSession",
      "consoleBaseUrl": "https://console.pearson.com"
    }
	</script>
 */
