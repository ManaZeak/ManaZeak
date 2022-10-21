// Parse url to check if it contains a ?invit-code=, so the input is auto-filled
const url = new URL(window.location.href);
const inviteCode = url.searchParams.get('invite-code');
const inviteCodeElement = document.getElementById('inviteCode-input');
// Update input value if url do contains a invit-code param
if (inviteCodeElement && inviteCode) {
  inviteCodeElement.value = inviteCode;
}
