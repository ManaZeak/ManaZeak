import Player from './Player.js';


class Controller {


  constructor() {
    this._player = null;
    this._init();
  }


  _init() {
    // Avoid re-init
    if (this._player) {
      return;
    }

    this._player = new Player();
  }


  changeTrack(options) {
    this._player.changeTrack(`/play/${options.id}`);
  }


}


export default Controller;