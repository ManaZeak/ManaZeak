// Parse url to check if it contains a ?invit-code=, so the input is auto-filled
const url = new URL(window.location.href);
const inviteCode = url.searchParams.get('invite-code');
const inviteCodeElement = document.getElementById('inviteCode-input');
// Update input value if url do contains a invit-code param
if (inviteCodeElement && inviteCode) {
  inviteCodeElement.value = inviteCode;
}
// Script so user can only enter to submit credentials 
document.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('submit-register').click();
  }
});
// Submit event listener
document.getElementById('submit-register').addEventListener('click', (e) => {
  e.preventDefault();
  // Restore errors
  document.getElementById('username-error').innerHTML = '';
  document.getElementById('inviteCode-error').innerHTML = '';
  document.getElementById('password1-error').innerHTML = '';
  document.getElementById('password2-error').innerHTML = '';
  document.getElementById('global-error').innerHTML = '';
  const options = {
    method: 'POST',
    headers: new Headers([
      ['Content-Type', 'application/json; charset=UTF-8'],
      ['Accept', 'application/json'],
      ['X-XSRF-TOKEN', document.getElementById('csrf-token').value]
    ]),
    body: JSON.stringify({
      username: document.getElementById('username-input').value,
      password1: document.getElementById('password-one-input').value,
      password2: document.getElementById('password-two-input').value,
      inviteCode: document.getElementById('inviteCode-input').value
    })
  };
  // Execute POST request on login
  fetch('/register/', options)
    .then(data => {
      data.text()
        .then(response => {
          try {
            // If response string is parsable, an error occured with credentials
            const err = JSON.parse(response);
            for (let i = 0; i < err.notifications.length; ++i) {
              if (err.notifications[i].message.includes('Username')) {
                document.getElementById('username-error').innerHTML = err.notifications[i].message;
              } else if (err.notifications[i].message.includes('invite')) {
                document.getElementById('inviteCode-error').innerHTML = err.notifications[i].message;
              } else if (err.notifications[i].message.includes('Password')) {
                document.getElementById('password1-error').innerHTML = err.notifications[i].message;
                document.getElementById('password2-error').innerHTML = err.notifications[i].message;
              } else {
                document.getElementById('global-error').innerHTML = err.notifications[i].message;                
              }
            }
          } catch (error) {
            // Otherwise, the server gave a token
            localStorage.setItem('mzk-jwt-token', response);
            localStorage.setItem('mzk-register-wip', true);
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
