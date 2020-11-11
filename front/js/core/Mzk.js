import UserInterface from '../view/UserInterface';
import Kom from './Kom';
'use strict';


class Mzk {


  constructor() {
    this.kom = null;
    this.ui = null;
  }


  initSession() {
    this.kom = new Kom();
    this.ui = new UserInterface();
  }


  setView(options) {
    this.ui.setSceneView(options).then(() => {
      console.log('view instantiaded');
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


}


export default Mzk;
