import Utils from './utils/Utils';
import CustomEvents from './utils/CustomEvents';
import Shortcut from './utils/Shortcut';
import Logger from './utils/Logger';
import Notification from './utils/Notification';


import Mzk from './core/Mzk';


// Globally used components (singleton)
window.Utils = new Utils();
window.Evts = new CustomEvents();
window.Shortcut = new Shortcut();
window.Notif = new Notification();
window.Logger = new Logger({
  notification: window.Notif,
  log: (window.location.href.indexOf('?debug') > -1) ? true : false
});

// Create new ManaZeak object to init internals then full init
window.mzk = new Mzk();
window.mzk.initSession();
