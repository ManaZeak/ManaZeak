import Utils from './utils/Utils.js';
import Logger from './utils/Logger.js';
import CustomEvents from './utils/Events.js';
import Shortcut from './utils/Shortcut.js';
import Notification from './ui/component/Notification.js';
import Mzk from './core/Mzk.js';
'use strict';


// Build global helpers
window.Utils = new Utils();
window.Events = new CustomEvents();
window.Shortcut = new Shortcut();
window.Logger = new Logger({
  verbose: true,
  trace: true
});
window.Notification = new Notification({
  thickBorder: 'top',
  duration: 4000,
  transition: 200,
  maxActive: 3
});

window.ViewEnum = Object.freeze({
  'ListView': 'ListView',
  'AlbumView': 'AlbumView'
});
// Build ManaZeak when HTML DOM is ready
Events.addEvent('DOMContentLoaded', document, () => {
  const mzk = new Mzk();
  mzk.start();
  Events.addEvent('beforeunload', window, mzk.destroy, mzk);
});
