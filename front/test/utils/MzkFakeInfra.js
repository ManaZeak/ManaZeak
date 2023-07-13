// Artificial polyfill to simulate a background functionnal Mzk
// Refer to StarSession.js.
import Utils from '../../js/utils/Utils.js';
import Evts from '../../js/utils/CustomEvents.js';
import Shortcut from '../../js/utils/Shortcut.js';
import Logger from '../../js/utils/Logger.js';
import Notification from '../../js/utils/Notification.js';

window.Utils = new Utils();
window.Evts = new Evts();
window.Shortcut = new Shortcut();
window.Notif = new Notification();
window.Logger = new Logger({
  notification: window.Notif,
  log: true
});
