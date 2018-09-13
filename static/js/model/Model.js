import Player from '../core/Player.js'

class Model {
  constructor() {
    this._player = {};

    this._init();
  }

  _init() {
    this._player = new Player();
    Notification.info({ message: 'Success Model start' });
  }

      //  --------------------------------  PLAYER METHODS  ---------------------------------  //

  changeTrack(url) {
    return new Promise(function(resolve) {
      this._player.changeTrack(url).then(resolve);
    }.bind(this));
  }

  togglePlay() {
    return new Promise(function(resolve) {
      this._player.togglePlay();
      resolve();
    }.bind(this));
  }

  stopPlayback() {
    return new Promise(function(resolve) {
      this._player.stop();
      resolve();
    }.bind(this));
  }

  mute() {
    return new Promise(function(resolve) {
      this._player.mute();
      resolve();
    }.bind(this));
  }

  unmute() {
    return new Promise(function(resolve) {
      this._player.unmute();
      resolve();
    }.bind(this));
  }

  toggleMute() {
    return new Promise(function(resolve) {
      this._player.toggleMute();
      resolve();
    }.bind(this));
  }

  adjustVolume(amount) {
    return new Promise(function(resolve) {
      this._player.adjustVolume(amount);
      resolve();
    }.bind(this));
  }

  setVolume(volume) {
    return new Promise(function(resolve) {
      this._player.setVolume(volume);
      resolve();
    }.bind(this));
  }

  adjustProgress(amount) {
    return new Promise(function(resolve) {
      this._player.adjustProgress(amount);
      resolve();
    }.bind(this));
  }

  setProgress(progress) {
    return new Promise(function(resolve) {
      this._player.setProgress(progress);
      resolve();
    }.bind(this));
  }

  getVolume() { return this._player.getVolume(); }
  getPlayer() { return this._player; }
}

export default Model;
