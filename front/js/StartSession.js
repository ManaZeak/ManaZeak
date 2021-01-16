import CustomEvents from './utils/CustomEvents';
import Notification from './utils/Notification';
import Logger from './utils/Logger';
import Utils from './utils/Utils';
import Mzk from './core/Mzk';
'use strict';

window.Events = new CustomEvents();
window.Notification = new Notification();
window.Logger = new Logger({
  notification: window.Notification
});
window.Utils = new Utils();

window.mzk = new Mzk();
window.mzk.initSession();
