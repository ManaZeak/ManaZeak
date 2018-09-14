import Player from '../core/Player.js'
import Collection from './Collection.js'

class Model {
  constructor() {
    this._player = {};
    this._collection = {};

    this._init();
  }

  _init() {
    this._player = new Player();
    this._collection = new Collection();
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

  //  --------------------------------  COLLECTION METHODS  ---------------------------------  //

  initCollection(response) {
    if (response.DONE) {
      let a = this._collection.addPlaylist(response, true); // remove true when loading all playlists
      this._collection.initialScan(a);
      console.log(this._collection);
    }

    else if (response.ERROR_KEY === null) {
      this._collection.newLibrary();
    }

    else {
      Errors.raise(response.ERROR_KEY);
    }
  }

  getVolume() { return this._player.getVolume(); }
  getPlayer() { return this._player; }
  getCollection() { return this._collection; }
}

export default Model;
