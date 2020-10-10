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
