import CustomEvents from './utils/CustomEvents';
import Notification from './utils/Notification';
import Logger from './utils/Logger';
import Utils from './utils/Utils';
import Mzk from './core/Mzk';


// Globally used components (singleton)
window.Utils = new Utils();
window.Evts = new CustomEvents();
window.Logger = new Logger({
  notification: new Notification(),
  log: (window.location.href.indexOf('?debug') > -1) ? true : false
});

// Create new ManaZeak object to init internals then full init
window.mzk = new Mzk();
window.mzk.initSession();
