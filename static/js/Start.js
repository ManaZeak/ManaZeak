import Utils from './utils/Utils.js'
import Errors from './utils/Errors.js'
import Shortcut from './utils/Shortcut.js'
import Notification from './utils/Notification.js'

import Mzk from './core/Mzk.js'

let errorsOptions = {
  verbose: true,
  trace: true
};

let notificationOptions = {
    thickBorder: 'top',
    duration: 4000,
    transition: 200,
    maxActive: 3
};

window.Utils = new Utils();
window.Errors = new Errors(errorsOptions);
window.Shortcut = new Shortcut();
window.Notification = new Notification(notificationOptions);

document.addEventListener('DOMContentLoaded', () => { window.mzk = new Mzk(); mzk.init(); });
