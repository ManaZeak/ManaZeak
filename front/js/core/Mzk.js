import Kom from './Kom';
import Lang from './Lang';
import UserInterface from '../view/UserInterface';
import Controller from './Controller.js';


class Mzk {


  constructor() {
    this.kom = null;
    this.nls = null;
    this.ui = null;
    this.ctrl = null;
  }


  initSession() {
    // HTML template is loaded with loading overlay
    // Initializing communication and UI controllers
    this.kom = new Kom();
    this.nls = new Lang('en');
    this.ui = new UserInterface();
    this.ctrl = new Controller();
    // Init scene with main page
    this.setView({ name: 'MainPage' });
  }


  setView(options) {
    this.ui.setSceneView(options)
      .then(() => Logger.raise('F_VIEW_SET_SUCCESS'))
      .catch(() => Logger.raise('F_VIEW_SET_ERROR'));
  }


  setModal(options) {
    this.ui.setModal(options)
      .then(() => Logger.raise('F_MODAL_SET_SUCCESS'))
      .catch(() => Logger.raise('F_MODAL_SET_ERROR'));
  }


  changeTrack(options) {
    this.ctrl.changeTrack(options);
  }


}


export default Mzk;
