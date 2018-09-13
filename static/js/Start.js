import Utils from './utils/Utils.js'
import Errors from './utils/Errors.js'
import Notification from './utils/Notification.js'

import Mzk from './core/Mzk.js'

window.Utils = new Utils();
window.Errors = new Errors({
  verbose: true,
  trace: true
});
window.Notification = new Notification({
    thickBorder: 'top',
    duration:    4000,
    transition:  200,
    maxActive:   3
});

document.addEventListener('DOMContentLoaded', () => { window.mzk = new Mzk(); mzk.init(); });
