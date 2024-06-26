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
  // No token set, redirect to /login/
  window.location.replace('/login/');
} else {
  const splitedToken = localStorage.getItem('mzk-jwt-token').split('.');
  if (splitedToken.length === 3) {
    // JWT token must be splitted in 3 parts, algo, user data and token data
    const tokenInfo = JSON.parse(atob(splitedToken[1]));
    if (tokenInfo['register-wip'] === true) {
      // Registration in progress, redirect to /additionalRegisterInfo/
      loadAdditionnalRegisterInfo();
    } else if ((tokenInfo.exp * 1000) - Date.now() <= 0) { // Convert expiration from s to ms
      // JWT token expiration date has passed, clear localStorage item and redirect to login
      localStorage.removeItem('mzk-jwt-token');
      window.location.replace('/login/');
    } else {
      // Valid JWT set, redirect to /app/
      loadApp();
    }
  } else {
    // This use case should not happen. But if, for some reason it does,
    // we clear token and redirect user to login
    localStorage.removeItem('mzk-jwt-token');
    window.location.replace('/login/');
  }
}
