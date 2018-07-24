import Utils from './utils/Utils.js'
import Mzk from './Mzk.js'

window.Utils = new Utils;
document.addEventListener('DOMContentLoaded', () => { window.mzk = new Mzk(); });
