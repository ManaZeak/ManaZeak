import '../scss/style.scss';

import Utils from './utils/Utils.js';
import Logger from './utils/Logger.js';
import Events from './utils/Events.js';
import Shortcut from './utils/Shortcut.js';
import Notification from './ui/component/Notification.js';
import Mzk from './core/Mzk.js';
'use strict';

const loggerOptions = {
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
window.Logger = new Logger(loggerOptions);
window.Events = new Events();
window.Shortcut = new Shortcut();
window.Notification = new Notification(notificationOptions);

window.ViewEnum = Object.freeze({
  'ListView': 'ListView',
  'AlbumView': 'AlbumView'
});

document.addEventListener('DOMContentLoaded', () => {
  window.mzk = new Mzk();
  mzk.start();
});
