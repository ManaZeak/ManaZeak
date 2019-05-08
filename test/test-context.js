import Logger from '../src/js/utils/Logger.js';
import Utils from '../src/js/utils/Utils.js';

window.Logger = new Logger({
  verbose: true,
  trace: true
});
window.Utils = new Utils();

const testsContext = require.context("./specs", true, /.spec.js$/);
testsContext.keys().forEach(testsContext);
