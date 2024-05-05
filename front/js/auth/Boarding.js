// Purpose of boarding page is, post login, to ensure that
// user has an existing JWT token. If so, build Mzk session
// otherwise, the user will be redirected to login page
// Redirect user to /login if no jwt token is found in ls

const additionnalRegister = () => {
  fetch('/additionalRegisterInfo/', {
    method: 'GET',
    headers: new Headers([
      ['Content-Type', 'application/json; charset=UTF-8'],
      ['Accept', 'application/json'],
      ['Authorization', `Bearer ${localStorage.getItem('mzk-jwt-token')}`]
    ])
  })
    .then(raw => {
      raw.text()
        .then(parsed => {
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

const loadApp = () => {
  fetch('/app/', {
    method: 'GET',
    headers: new Headers([
      ['Content-Type', 'application/json; charset=UTF-8'],
      ['Accept', 'application/json'],
      ['Authorization', `Bearer ${localStorage.getItem('mzk-jwt-token')}`]
    ])
  })
    .then(raw => {
      raw.text()
        .then(parsed => {
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

if (localStorage.getItem('mzk-jwt-token') === null) {
  // First check if token exist in ls. Should have been set if coming from Login
  window.location = '/login/';
} else if (localStorage.getItem('mzk-register-wip') === 'true') {
  additionnalRegister();
} else {
  // Now the fun starts : fetch / page, build DOM, load bundles and GO
  loadApp();
}
