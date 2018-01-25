import Overrides from './utils/Overrides.js'
import App from './App.js'

document.addEventListener('DOMContentLoaded', function() {
    window.app = new App();
    window.app.init();
});
