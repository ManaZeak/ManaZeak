// Redirect user to login after 5 seconds, and update redirect string
const redirectString = document.getElementById('redirect-string');
let counter = 0;
const id = setInterval(() => {
  // Stoping condition, redirect to login page
  if (counter === 4) {
    clearInterval(id);
    location.replace('login/');
  }
  // Update text with remaining time, 5 must be displayed by default in HTML when loaded
  if (redirectString?.innerHTML) {
    redirectString.innerHTML = redirectString.innerHTML.replace(/\d/g, `${4 - counter}`);
  }
  // Increment counter
  ++counter;
}, 1000);
