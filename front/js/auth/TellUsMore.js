if (localStorage.getItem('mzk-jwt-token') === null) {
  // First check if token exist in ls. Should have been set if coming from Register
  window.location = '/login/';
}
// Tell us more ; Update max value for birthday selection to today
const sessionDate = new Date();
const yyyy = sessionDate.getFullYear();
let mm = sessionDate.getMonth() + 1;
let dd = sessionDate.getDate();
// Prefix day with a zero if needed
if (dd < 10) {
  dd = `0${dd}`;
}
// Prefix month with a zero if needed
if (mm < 10) {
  mm = `0${mm}`;
}
// Create output string and update max attribute on birthday date input
document.getElementById('birthday-input').setAttribute('max', `${yyyy}-${mm}-${dd}`);
// Script so user can only enter to submit credentials 
document.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('submit-tellusmore').click();
  }
});

document.getElementById('submit-tellusmore').addEventListener('click', e => {
  e.preventDefault();
  const formData = new FormData(document.getElementById('tellusmore-form'));
  const options = {
    method: 'POST',
    headers: new Headers([
      ['X-XSRF-TOKEN', document.getElementById('csrf-token').value],
      ['Authorization', `Bearer ${localStorage.getItem('mzk-jwt-token')}`]
    ]),
    body: formData
  };
  // Execute POST request on login
  fetch('/additionalRegisterInfo/', options)
    .then(data => {
      data.text()
        .then(response => {
          try {
            // If response string is parsable, an error occured with credentials
            const err = JSON.parse(response);
            console.error(err);
          } catch (error) {
            // Clear register wip key to allow Boarding to redirect to /app/
            localStorage.removeItem('mzk-register-wip');
            // Redirect to boarding to check JWT and build /app
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
