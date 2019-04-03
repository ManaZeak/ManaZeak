import Utils from '../src/js/utils/Utils.js';
window.Utils = new Utils();

const testsContext = require.context("./specs", true, /.spec.js$/);
testsContext.keys().forEach(testsContext);
