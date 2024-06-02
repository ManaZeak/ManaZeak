// First check if token exist in localStorage. 
// It must have been set if coming from either Login or Register
if (localStorage.getItem('mzk-jwt-token') === null) {
  window.location.replace('/login/');
}

// Callback to submit form to server
const submitForm = options => {
  fetch('/additionalRegisterInfo/', options).then(data => {
    data.text().then(parsed => {
      if (parsed === '') {
        // Clear register wip key to allow Boarding to redirect to /app/
        localStorage.removeItem('mzk-register-wip');
        // Redirect to boarding to check JWT and build /app
        window.location.replace('/');
      } else {
        const newHTML = document.open('text/html', 'replace');
        newHTML.write(parsed);
        newHTML.close();
      }
    }).catch(err => console.error(err));
  }).catch(err => console.error(err));
};

// For birthday date field, we will set max attribute to today's date
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
// DOM useful elements for register
const submitButton = document.getElementById('submit-tellusmore');
const birthdayInput = document.getElementById('birthday-input');
const tellUsMoreForm = document.getElementById('tellusmore-form');
const csrfToken = document.getElementById('csrf-token');
// Create output string and update max attribute on birthday date input
birthdayInput.setAttribute('max', `${yyyy}-${mm}-${dd}`);
// Submit button click event listener
submitButton.addEventListener('click', e => {
  e.preventDefault();
  const formData = new FormData(tellUsMoreForm);
  const options = {
    method: 'POST',
    headers: new Headers([
      ['X-XSRF-TOKEN', csrfToken.value],
      ['Authorization', `Bearer ${localStorage.getItem('mzk-jwt-token')}`]
    ]),
    body: formData
  };
  // Use callback to POST form data
  submitForm(options);
});
// Listen to keypress on Enter to automatically submit form
document.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    submitButton.click();
  }
});
