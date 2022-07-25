import UserInterface from '../view/UserInterface';
import Kom from './Kom';

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
    this.ui = new UserInterface();
    this.ui.stopLoading();
    // Init scene with main page
    this.setView({ name: 'MainPage' });
  }


  setView(options) {
    this.ui.setSceneView(options).then(() => {
      console.log('view instantiated');
    }).catch(error => {
      Logger.raise(error);
    });
  }


  setModal(options) {
    this.ui.setModal(options).then(() => {
      console.log('modal created');
    }).catch(error => {
      Logger.raise(error);
    });
  }


  getFragment(options) {
    return new Promise((resolve, reject) => {
      this.ui.getFragment(options).then(response => {
        console.log('fragment fetched');
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  }


}


export default Mzk;
