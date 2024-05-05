// Script so user can only enter to submit credentials 
document.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('submit-login').click();
  }
});
// Submit event listener
document.getElementById('submit-login').addEventListener('click', (e) => {
  e.preventDefault();
  const options = {
    method: 'POST',
    headers: new Headers([
      ['Content-Type', 'application/json; charset=UTF-8'],
      ['Accept', 'application/json'],
      ['X-XSRF-TOKEN', document.getElementById('csrf-token').value]
    ]),
    body: JSON.stringify({
      username: document.getElementById('username-input').value,
      password: document.getElementById('password-input').value
    })
  };
  // Execute POST request on login
  fetch('/login/', options)
    .then(data => {
      data.text()
        .then(response => {
          try {
            // If response string is parsable, an error occured with credentials
            const err = JSON.parse(response);
            document.getElementById('global-error').innerHTML = err.notifications[0].message;
          } catch (error) {
            // Otherwise, the server gave a token
            localStorage.setItem('mzk-jwt-token', response);
            // Redirect to boarding to x-check JWT and build /app
            window.location = '/';
          }
        })
        .catch(err => {
          console.error(err);          
        });
    })
    .catch(err => {
      console.error(err);
    });
});
