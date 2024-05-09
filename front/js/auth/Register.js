import Notification from '../utils/Notification';

// We first need to check if the user already have a JWT token.
// If so, we check token validity, and if the user has already completed
// the registration proccess, in this case, redirect to Boarding (/)
if (localStorage.getItem('mzk-jwt-token') !== null) {
  const splitedToken = localStorage.getItem('mzk-jwt-token').split('.');
  if (splitedToken.length === 3) {
    // JWT token must be splitted in 3 parts, algo, user data and token data
    const tokenInfo = JSON.parse(atob(splitedToken[1]));
    const tokenExpiration = tokenInfo.exp * 1000; // Convert expiration from s to ms
    if (tokenExpiration - Date.now() <= 0) {
      // JWT token expiration date has passed, clear localStorage item,
      // and send back to Boarding for proper redirection to /login/
      localStorage.removeItem('mzk-jwt-token');
      window.location.replace('/');
    } else if (tokenInfo['register-wip'] === false) {
      // User registration is complete, send back to Boarding for proper redirection to /login/
      window.location.replace('/');
    }
  } else {
    // Otherwise, JWT is invalid, clear localStorage item and let register play its part
    localStorage.removeItem('mzk-jwt-token');
  }
}

// Required utils and class for UI feedback
const SUPPORTED_LANG = ['en', 'fr'];
const notif = new Notification();
let lang = navigator.language || navigator.userLanguage;
let errors = {}; // i18n frontend keys/values
let hasErrorKeys = false;
// Fallback to english if navigator lang not supported
if (!SUPPORTED_LANG.includes(lang)) {
  lang = 'en';
}

// Callback to submit register to server
const submitRegister = options => {
  fetch('/register/', options).then(data => {
    if (data.ok) {
      // Parse server response to extract and save JWT token
      data.text().then(response => {
        localStorage.setItem('mzk-jwt-token', response);
        localStorage.setItem('mzk-register-wip', true);
        // Redirect to boarding to x-check JWT and build /additionalRegisterInfo/
        // We use replace instead of direct set (with =) to avoid saving this view in location history
        // https://developer.mozilla.org/en-US/docs/Web/API/Location/replace
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
        console.error(`Error ${data.status} on /register/`, data);
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
  // DOM useful elements for register
  const submitButton = document.getElementById('submit-register');
  const usernameInput = document.getElementById('username-input');
  const inviteCodeInput = document.getElementById('inviteCode-input');
  const password1Input = document.getElementById('password-one-input');
  const password2Input = document.getElementById('password-two-input');
  const csrfToken = document.getElementById('csrf-token');
  // Parse url to check if it contains a ?invit-code=, if so, the input is auto-filled
  const url = new URL(window.location.href);
  const inviteCode = url.searchParams.get('invite-code');
  // Update input value if url do contains a invit-code parameter
  if (inviteCode) {
    inviteCodeInput.value = inviteCode;
  }
  // Submit button click event listener
  submitButton.addEventListener('click', e => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: new Headers([
        ['Content-Type', 'application/json; charset=UTF-8'],
        ['Accept', 'application/json'],
        ['X-XSRF-TOKEN', csrfToken.value]
      ]),
      body: JSON.stringify({
        username: usernameInput.value,
        inviteCode: inviteCodeInput.value,
        password1: password1Input.value,
        password2: password2Input.value
      })
    };
    // Use callback to POST register data
    submitRegister(options);
  });
  // Listen to keypress on Enter to automatically submit register
  document.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitButton.click();
    }
  });
}).catch(err => console.error(err));
