// Redirect bundle is used for successfull logout, or permission error
// It will redirect user to login after 5 seconds
// The number 5 must be displayed by default in HTML when loaded
const redirectString = document.getElementById('redirect-string');
let counter = 0;

// Interval callback fired every second
setInterval(() => {
  // Breaking condition after 5 seconds
  if (counter === 4) {
    // No need to clearInterval as user is redirected
    // We use replace instead of direct set (with =) to avoid saving this redirect view in location history
    // https://developer.mozilla.org/en-US/docs/Web/API/Location/replace
    window.location.replace('login/');
  }
  // Update UI with remaining time
  if (redirectString?.innerHTML) {
    redirectString.innerHTML = redirectString.innerHTML.replace(/\d/g, `${4 - counter}`);
  }
  // Update counter at each step to reach breaking condition eventually
  ++counter;
}, 1000);
