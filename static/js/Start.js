import Utils from './utils/Utils.js'
import Notification from './utils/Notification.js'

import Mzk from './core/Mzk.js'

window.Utils = new Utils();
window.Notification = new Notification({
    thickBorder: 'top',
    duration:    4000,
    transition:  200,
    maxActive:   3
});

document.addEventListener('DOMContentLoaded', () => { window.mzk = new Mzk(); });
