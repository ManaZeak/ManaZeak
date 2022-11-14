// Redirect user to login after 5 seconds, and update redirect string
const redirectString = document.getElementById('redirect-string');
let counter = 0;
// 'Clock' iterating 5 times
window.setInterval(() => {
  // Stoping condition, redirect to login page
  if (counter === 4) {
    window.location.replace('login');
  }
  // Update text with remaining time, 5 displayed when HTML is loaded
  if (redirectString && redirectString.innerHTML) {
    redirectString.innerHTML = redirectString.innerHTML.replace(/\d/g, `${4 - counter}`);
  }
  // Increment counter
  ++counter;
}, 1000);
