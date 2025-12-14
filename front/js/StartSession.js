import Utils from './utils/Utils';
import CustomEvents from './utils/CustomEvents';
import Shortcut from './utils/Shortcut';
import Logger from './utils/Logger';
import Notification from './utils/Notification';

import Mzk from './core/Mzk';

// Redirect user to /login if no jwt token is found in ls
// This verification have previously occured in Boarding.js
// But we know users can be pesky so here is ANOTHER ONE.
if (localStorage.getItem('mzk-jwt-token') === null) {
  window.location = '/login/';
}

// Globally used components (singleton)
window.Utils = new Utils();
window.Evts = new CustomEvents();
window.Shortcut = new Shortcut();
window.Notif = new Notification();
window.Logger = new Logger({
  notification: window.Notif,
  log: (window.location.href.indexOf('?debug') > -1)
});

// Create new ManaZeak object to init internals then full init
window.DEBUG = (window.location.href.indexOf('?debug') > -1) ? true : false;
window.mzk = new Mzk();
window.mzk.initSession();
