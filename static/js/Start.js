import App from './App.js'

window.debug = true; // Debug variable : when activated, mzk will log every important front-end call

document.addEventListener('DOMContentLoaded', function() {
    window.app = new App(function() {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                console.log(JSON.parse(this.responseText));
            }
        };

        let a = JSON.stringify({
            LANG: 'en'
        });

        console.log(a);

        xhr.open('POST', '  language/', true);
        xhr.setRequestHeader('X-CSRFToken', window.app.cookies['csrftoken']);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(a);

        window.app.init();
    });
});
