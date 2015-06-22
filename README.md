# o-app-header [![Build Status](https://travis-ci.org/Pearson-Higher-Ed/o-app-header.svg?branch=master)](https://travis-ci.org/Pearson-Higher-Ed/o-app-header)

## Initialization

You can initialize the application header by dispatching the `o.DOMContentLoaded` event or by calling the static `init()` method.

Using `o.DOMContentLoaded`:

```js
document.addEventListener('DOMContentLoaded', function() {
  document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

Using `init()`:

```js
var AppHeader = require('o-app-header');
AppHeader.init();
```

## Configuration

Configuration properties may be passed as an object argument to the `init()` method or defined in a configuration block on the page:

```html
<script data-o-app-header-config type="application/json">
  {
  	"consoleBaseUrl": "https://...",
  	"sessionGlobal": "Session"
  }
</script>
```

Refer to the [options object](#api-methods-init) for a list of properties.

## API

### Methods

<a name="api-methods-init"></a>
`init([element], [options])`

- `element`: an `HTMLElement` or selector string. The selected element will be replaced with the `header` element unless it is `document.body`, in which case the header will be preprended to the body content.
- `options`: an object with the following properties:

| Property                 | Description                       |
|--------------------------|-----------------------------------|
| consoleBaseUrl           | The Console application base URL (default: https://console.pearson.com) |
| sessionGlobal            ||

## Browser support

TODO

Browser versions that do not support [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) must use a polyfill, for example via the [polyfill service](https://cdn.polyfill.io/v1/docs/):

```html
<script src="https://cdn.polyfill.io/v1/polyfill.min.js?features=default,WeakMap"></script>
```

## License

This software is published by Pearson Education under the [MIT license](LICENSE).
