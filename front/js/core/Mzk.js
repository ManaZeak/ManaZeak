import UserInterface from '../view/UserInterface';
import Kom from './Kom';
import Lang from './Lang';
'use strict';


class Mzk {


  constructor() {
    this.kom = null;
    this.ui = null;
  }


  initSession() {
    // HTML template is loaded with loading overlay
    // Initializing communication and UI controllers
    this.kom = new Kom();
    this.nls = new Lang('en');
    this.ui = new UserInterface();
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


  getFragment(options) {
    return new Promise((resolve, reject) => {
      this.ui.getFragment(options)
        .then(fragment => {
          Logger.raise('F_FRAGMENT_GET_SUCCESS');
          resolve(fragment);
        })
        .catch(() => {
          Logger.raise('F_FRAGMENT_GET_ERROR');
          reject();
        });
    });
  }


}


export default Mzk;
