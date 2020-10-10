/* Redirect user to login after 5 seconds, and update redirect string */
const redirectString = document.getElementById('redirect-string');
let counter = 0;
window.setInterval(() => {
    if (counter === 4) {
        window.location.replace('login');
    }
    redirectString.innerHTML = redirectString.innerHTML.replace(/[0-9]/g, `${4 - counter}`);
    ++counter;
}, 1000);
