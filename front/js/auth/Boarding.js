// Boarding's purpose is to redirect user to the proper page (part of Mzk authentication)
// It's the main entry point for Mzk app (/)
// When changing location, we use replace instead of direct set (with =) to avoid saving this view in location history
// https://developer.mozilla.org/en-US/docs/Web/API/Location/replace
// Three possible path :
//   1. No JWT token, redirect user to login
//   2. JWT token AND register in progress, build /additionalRegisterInfo/
//   3. JWT token, build /app/

// Callback for registration in progress, load /additionalRegisterInfo/ page
const loadAdditionnalRegisterInfo = () => {
  fetch('/additionalRegisterInfo/', {
    method: 'GET',
    headers: new Headers([
      ['Content-Type', 'application/json; charset=UTF-8'],
      ['Accept', 'application/json'],
      ['Authorization', `Bearer ${localStorage.getItem('mzk-jwt-token')}`]
    ])
  }).then(raw => {
    raw.text().then(parsed => {
      // First update displayed location
      window.history.pushState('', '', '/additionalRegisterInfo/');
      // Then parse string to update HTML
      const newHTML = document.open('text/html', 'replace');
      newHTML.write(parsed);
      newHTML.close();
    }).catch(() => window.location.replace('/login/'));
  }).catch(() => window.location.replace('/login/'));
};

// Callback for succesfull login, load /app/ page
const loadApp = () => {
  fetch('/app/', {
    method: 'GET',
    headers: new Headers([
      ['Content-Type', 'application/json; charset=UTF-8'],
      ['Accept', 'application/json'],
      ['Authorization', `Bearer ${localStorage.getItem('mzk-jwt-token')}`]
    ])
  }).then(raw => {
    raw.text().then(parsed => {
      // Then parse string to update HTML
      const newHTML = document.open('text/html', 'replace');
      newHTML.write(parsed);
      newHTML.close();
    }).catch(() => window.location.replace('/login/'));
  }).catch(() => window.location.replace('/login/'));
};

// Determine the user situation depending on localStorgae state
if (localStorage.getItem('mzk-jwt-token') === null) {
  window.location.replace('/login/'); // No token set, redirect to /login/
} else if (localStorage.getItem('mzk-register-wip') === 'true') {
  loadAdditionnalRegisterInfo(); // Registration in progress, redirect to /additionalRegisterInfo/
} else {
  loadApp(); // Valid JWT set, redirect to /app/
}
