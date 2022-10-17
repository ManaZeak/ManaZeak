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
    // Load User
    // Load NLS from user pref
    this.ui = new UserInterface();
    // Init scene with main page
    this.setView({ name: 'MainPage' });
  }


  setView(options) {
    this.ui.setSceneView(options).then(() => {
      Logger.raise({
        severity: 'success',
        title: 'View updated',
        message: `The ${options.name} view has been succesfully instantiated and displayed`
      });
    }).catch(error => {
      Logger.raise({
        severity: 'error',
        title: 'View not updated',
        message: `The ${options.name} view hasn't been instantiated nor displayed, ${error}`
      });
    });
  }


  setModal(options) {
    this.ui.setModal(options).then(() => {
      Logger.raise({
        severity: 'success',
        title: 'Modal opened',
        message: `The ${options.name} view has been succesfully instantiated and opened`
      });
    }).catch(error => {
      Logger.raise({
        severity: 'error',
        title: 'Modal not opened',
        message: `The ${options.name} view hasn't been instantiated nor opened, ${error}`
      });
    });
  }


  getFragment(options) {
    return new Promise((resolve, reject) => {
      this.ui.getFragment(options).then(response => {
        Logger.raise({
          severity: 'success',
          title: 'Fragment fetched',
          message: `The ${options.name} fragment has been succesfully loaded`
        });
        resolve(response);
      }).catch(error => {
        Logger.raise({
          severity: 'error',
          title: 'Fragment not fetched',
          message: `The ${options.name} view hasn't been loaded, ${error}`
        });
        reject(error);
      });
    });
  }


}


export default Mzk;
