/* Parse url to check if it contains an invit code, so the fields is auto-filled */
const pageLocation = window.location.href;
const url = new URL(pageLocation);
const inviteCode = url.searchParams.get('invite-code');
if (inviteCode) {
  document.getElementById('inviteCode-input').value = inviteCode;
}
