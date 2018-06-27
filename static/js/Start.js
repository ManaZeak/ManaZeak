import App from './App.js'

window.debug = false; // Debug variable : when activated, mzk will log every important front-end call

document.addEventListener('DOMContentLoaded', function() {
    window.app = new App(() => {
        window.app.init();
    });
});
