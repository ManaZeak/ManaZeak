import Player from '../core/Player.js'

class Model {
  constructor() {
    this.player = {};

    this._init();
  }

  _init() {
    this.player = new Player();
    Notification.info({ message: 'Success Model start' });
  }

  //  --------------------------------  PLAYBACK METHODS  ---------------------------------  //

  changeTrack(url) {
    return new Promise(function(resolve) {
      this.player.changeTrack(url).then(resolve);
    }.bind(this));
  }

  togglePlay() {
    return new Promise(function(resolve) {
      this.player.togglePlay();
      resolve();
    }.bind(this));
  }

  stopPlayback() {
    return new Promise(function(resolve) {
      this.player.stop();
      resolve();
    }.bind(this));
  }

  mute() {
    return new Promise(function(resolve) {
      this.player.mute();
      resolve();
    }.bind(this));
  }

  unmute() {
    return new Promise(function(resolve) {
      this.player.unmute();
      resolve();
    }.bind(this));
  }

  toggleMute() {
    return new Promise(function(resolve) {
      this.player.toggleMute();
      resolve();
    }.bind(this));
  }

  adjustVolume(amount) {
    return new Promise(function(resolve) {
      this.player.adjustVolume(amount);
      resolve();
    }.bind(this));
  }

  setVolume(volume) {
    return new Promise(function(resolve) {
      this.player.setVolume(volume);
      resolve();
    }.bind(this));
  }

  adjustProgress(amount) {
    return new Promise(function(resolve) {
      this.player.adjustProgress(amount);
      resolve();
    }.bind(this));
  }

  setProgress(progress) {
    return new Promise(function(resolve) {
      this.player.setProgress(progress);
      resolve();
    }.bind(this));
  }
}

export default Model;
