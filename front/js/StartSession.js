import CustomEvents from './utils/CustomEvents';
import Notification from './utils/Notification';
import Logger from './utils/Logger';
import Utils from './utils/Utils';
import Mzk from './core/Mzk';
'use strict';


// Globally used util components
window.Evts = new CustomEvents();
window.Ntif = new Notification();
window.Utils = new Utils();
window.Logger = new Logger({ notification: window.Notification });


// Create new ManaZeak object to init internals then full init
window.mzk = new Mzk();
window.mzk.initSession();
