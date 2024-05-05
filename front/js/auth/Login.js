import Lang from '../core/Lang';
import Notification from '../utils/Notification';
// Required utils and class for UI feedback
const SUPPORTED_LANG = ['en', 'fr'];
const notif = new Notification();
let lang = navigator.language || navigator.userLanguage;
let errors = {};
// Fallback to english if navigator lang not supported
if (!SUPPORTED_LANG.includes(lang)) {
  lang = 'en';
}
// Submit login method
const submitLogin = options => {
  // Execute POST request on login
  fetch('/login/', options).then(data => {
    if (data.ok) {
      data.text().then(response => {
        // Otherwise, the server gave a token
        localStorage.setItem('mzk-jwt-token', response);
        // Redirect to boarding to x-check JWT and build /app
        window.location = '/';
      }).catch(err => {
        notif.new(errors['AUTH_PARSE_ERROR']);
        console.error(err);
      });
    } else {
      data.text().then(response => {
        const err = JSON.parse(response);
        for (let i = 0; i < err.notifications.length; ++i) {
          notif.new(err.notifications[i]);
        }
        console.error(`Error ${data.status} on /login/`, data.body);
      });
    }
  }).catch(err => {
    notif.new(errors['AUTH_NETWORK_ERROR']);
    console.error(err);
  });
};
// Now fetch UI i18n keys, then listen to events
fetch(`/static/nls/${lang}.json`, {
  method: 'GET',
  header: new Headers([
    ['Content-Type', 'application/json; charset=UTF-8']
  ])
}).then(rawKeys => {
  rawKeys.json().then(keys => errors = keys);
  const submitButton = document.getElementById('submit-login');
  const usernameInput = document.getElementById('username-input');
  const passwordInput = document.getElementById('password-input');
  const csrfToken = document.getElementById('csrf-token');
  // Submit button click event listener 
  submitButton.addEventListener('click', e => {
    e.preventDefault();
    // Build POST options
    const options = {
      method: 'POST',
      headers: new Headers([
        ['Content-Type', 'application/json; charset=UTF-8'],
        ['Accept', 'application/json'],
        ['X-XSRF-TOKEN', csrfToken.value]
      ]),
      body: JSON.stringify({
        username: usernameInput.value,
        password: passwordInput.value
      })
    };
    // Submit login to server
    submitLogin(options);
  });
  // Listen to keypress on Enter to auto submit form 
  document.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitButton.click();
    }
  });
}); // Nothing to catch, otherwise where is your god
