import Notification from '../utils/Notification';

// When changing location, we use replace instead of direct set (with =) to avoid saving this view in location history
// https://developer.mozilla.org/en-US/docs/Web/API/Location/replace

// We first need to check if the user already have a JWT token.
// If so, we then need to check if the registration process is in progress,
// in this case, we redirect user to Boarding (/) which will handle the redirection.
// If registration is completed, we then need to verify if it hasn't expire, in this case,
// we simply redirect the user to Boarding (/) to load the app.
if (localStorage.getItem('mzk-jwt-token') !== null) {
  const splitedToken = localStorage.getItem('mzk-jwt-token').split('.');
  if (splitedToken.length === 3) {
    // JWT token must be splitted in 3 parts, algo, user data and token data
    const tokenInfo = JSON.parse(atob(splitedToken[1]));
    if (tokenInfo['register-wip'] === true) {
      // User already registered but did not filled, send back to Boarding for proper redirection
      window.location.replace('/');
    } else if ((tokenInfo.exp * 1000) - Date.now() <= 0) { // Convert expiration from s to ms
      // JWT token expiration date has passed, clear localStorage item and let login play its part
      localStorage.removeItem('mzk-jwt-token');
    } else {
      // JWT token is currently valid, redirect user to /
      window.location.replace('/');
    }
  } else {
    // Otherwise, JWT is invalid, clear localStorage item and let login play its part
    localStorage.removeItem('mzk-jwt-token');
  }
}

// Required utils and class for UI feedback
const SUPPORTED_LANG = ['en', 'fr'];
const notif = new Notification();
let lang = navigator.language || navigator.userLanguage;
let errors = {}; // i18n frontend keys/values
let hasErrorKeys = false; // Flag to ensure i18n keys/values are set
// Fallback to english if navigator lang not supported
if (!SUPPORTED_LANG.includes(lang)) {
  lang = 'en';
}

// Callback to submit login to server
const submitLogin = options => {
  fetch('/login/', options).then(data => {
    if (data.ok) {
      // Parse server response to extract and save JWT token
      data.text().then(response => {
        localStorage.setItem('mzk-jwt-token', response);
        // Redirect to boarding to x-check JWT and build /app/
        window.location.replace('/');
      }).catch(err => {
        // Only use notification if i18n keys/values are set
        if (hasErrorKeys === true) {
          notif.new(errors['AUTH_PARSE_ERROR']);
        }
        console.error(err);
      });
    } else {
      // Process received notifications to inform user of what went wrong
      data.text().then(response => {
        // Only use notification if i18n keys/values are set
        if (hasErrorKeys === true) {
          const err = JSON.parse(response);
          for (let i = 0; i < err.notifications.length; ++i) {
            notif.new(err.notifications[i]);
          }
        }
        console.error(`Error ${data.status} on /login/`, data);
      }).catch(err => {
        // Only use notification if i18n keys/values are set
        if (hasErrorKeys === true) {
          notif.new(errors['AUTH_PARSE_ERROR']);
        }
        console.error(err);
      });
    }
  }).catch(err => {
    // Only use notification if i18n keys/values are set
    if (hasErrorKeys === true) {
      notif.new(errors['AUTH_NETWORK_ERROR']);
    }
    console.error(err);
  });
};

// Fetch i18n frontend keys first for user feedback
fetch(`/static/nls/${lang}.json`, {
  method: 'GET',
  header: new Headers([
    ['Content-Type', 'application/json; charset=UTF-8']
  ])
}).then(rawKeys => {
  // Async parse i18n keys
  rawKeys.json().then(keys => {
    errors = keys;
    hasErrorKeys = true;
  }).catch(() => hasErrorKeys = false);
  // DOM useful elements for login
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
    // Use callback to POST login data
    submitLogin(options);
  });
  // Listen to keypress on Enter to automatically submit login
  document.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitButton.click();
    }
  });
}).catch(err => console.error(err));
