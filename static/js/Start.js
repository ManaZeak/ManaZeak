import Overrides from './utils/Overrides.js'
import App from './App.js'

console.log("Hello from Webpack");

document.addEventListener('DOMContentLoaded', function() {
    console.log("Init app ...");
    window.app = new App();
    window.app.init();
});