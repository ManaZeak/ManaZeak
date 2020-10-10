import CustomEvents from './utils/CustomEvents';
import Logger from './utils/Logger';
import Utils from './utils/Utils';
import Mzk from './core/Mzk';
'use strict';

window.Events = new CustomEvents();
window.Logger = new Logger();
window.Utils = new Utils();

window.mzk = new Mzk();
window.mzk.initSession();
