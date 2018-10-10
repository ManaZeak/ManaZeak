import Utils from './utils/Utils.js';
import Errors from './utils/Errors.js';
import Events from './utils/Events.js';
import Shortcut from './utils/Shortcut.js';
import Notification from './utils/Notification.js';
import Mzk from './core/Mzk.js';
'use_strict';

const errorsOptions = {
  verbose: true,
  trace: true
};

const notificationOptions = {
  thickBorder: 'top',
  duration: 4000,
  transition: 200,
  maxActive: 3
};

window.Utils = new Utils();
window.Errors = new Errors(errorsOptions);
window.Events = new Events();
window.Shortcut = new Shortcut();
window.Notification = new Notification(notificationOptions);

document.addEventListener('DOMContentLoaded', () => {
  window.mzk = new Mzk();
  mzk.start();
});
