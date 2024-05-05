// Boarding's purpose is to redirect user to the proper page (part of mzk authentication)
// Three possible path :
//   1. No JWT token, redirect user to login
//   2. JWT token AND register in progress, build /additionalRegisterInfo/
//   3. JWT token, build /app/

// Registration in progress, load /additionalRegisterInfo/
const additionnalRegister = () => {
  fetch('/additionalRegisterInfo/', {
    method: 'GET',
    headers: new Headers([
      ['Content-Type', 'application/json; charset=UTF-8'],
      ['Accept', 'application/json'],
      ['Authorization', `Bearer ${localStorage.getItem('mzk-jwt-token')}`]
    ])
  }).then(raw => {
    raw.text().then(parsed => {
      // First update location
      window.history.pushState('', '', '/additionalRegisterInfo/');
      // Then parse string into HTML
      const newHTML = document.open('text/html', 'replace'); 
      newHTML.write(parsed);
      newHTML.close();
    })
    .catch(() => {
      // Sorry, back to startx
      window.location = '/login/';
    });
  })
  .catch(() => {
    // Sorry, back to startx
    window.location = '/login/';
  });
};
// User logged in, load ManaZeak /app/
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
      // First update location
      window.history.pushState('', '', '/');
      // Then parse string into HTML
      const newHTML = document.open('text/html', 'replace'); 
      newHTML.write(parsed);
      newHTML.close();
    })
    .catch(() => {
      // Sorry, back to startx
      window.location = '/login/';
    });
  })
  .catch(() => {
    // Sorry, back to startx
    window.location = '/login/';
  });
};
// Determine the user situation depending on localStorgae state
if (localStorage.getItem('mzk-jwt-token') === null) {
  window.location = '/login/';
} else if (localStorage.getItem('mzk-register-wip') === 'true') {
  additionnalRegister();
} else {
  // Now the fun starts : fetch / page, build DOM, load bundles and GO
  loadApp();
}
