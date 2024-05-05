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
// Submit register method
const submitRegister = options => {
  // Execute POST request on register
  fetch('/register/', options).then(data => {
    if (data.ok) {
      data.text().then(response => {
        localStorage.setItem('mzk-jwt-token', response);
        localStorage.setItem('mzk-register-wip', true);
        // Redirect to boarding to x-check JWT and build /additionalRegisterInfo/
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
        console.error(`Error ${data.status} on /register/`, data);
      });
    }
  })
  .catch(err => {
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
  const submitButton = document.getElementById('submit-register');
  const usernameInput = document.getElementById('username-input');
  const inviteCodeInput = document.getElementById('inviteCode-input');
  const password1Input = document.getElementById('password-one-input');
  const password2Input = document.getElementById('password-two-input');
  const csrfToken = document.getElementById('csrf-token');
  // Parse url to check if it contains a ?invit-code=, so the input is auto-filled
  const url = new URL(window.location.href);
  const inviteCode = url.searchParams.get('invite-code');
  // Update input value if url do contains a invit-code param
  if (inviteCodeInput && inviteCode) {
    inviteCodeInput.value = inviteCode;
  }
  // Submit event listener
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
    // Submit register to server
    submitRegister(options);
  });
  // Listen to keypress on Enter to auto submit form 
  document.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitButton.click();
    }
  });
}); // Nothing to catch, otherwise where is your god
