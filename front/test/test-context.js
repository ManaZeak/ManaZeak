//let testsContext = require.context("./specs", true, /.spec.js$/);
//testsContext.keys().forEach(testsContext);
// Perform unit tests
const testsContext = require.context('./specs/unit', true, /.spec.js$/);
testsContext.keys().forEach(testsContext);
