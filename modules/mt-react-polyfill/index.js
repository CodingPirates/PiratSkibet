require('es5-shim')
require('es6-shim')

require('es7-shim/Array').shim()
require('es7-shim/Object').shim()
require('es7-shim/String').shim()

if (typeof window.Symbol === 'undefined') {
  require('es6-symbol/implement')
}

if (typeof window.Proxy === 'undefined') {
  // window.Proxy = require('proxy-polyfill/src/proxy');
}

if (typeof window.Promise === 'undefined' || typeof ((new (window.Promise)(() => 1)).finally) === 'undefined') {
  window.Promise = require('es6-promise')
}

require('url-search-params-polyfill')

/// //////////////////////////////
// NodeList forEach
/// //////////////////////////////

if (typeof NodeList.prototype.forEach !== 'function') {
  NodeList.prototype.forEach = Array.prototype.forEach
}
