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
    //Notification.info({ message: 'Success Model start' });
  }

//  --------------------------------  PLAYER METHODS  ---------------------------------  //

  changeTrack(url) {
    return new Promise(resolve => {
      this._player.changeTrack(url).then(resolve);
    });
  }

  togglePlay() {
    return new Promise(resolve => {
      this._player.togglePlay();
      resolve();
    });
  }

  stopPlayback() {
    return new Promise(resolve => {
      this._player.stop();
      resolve();
    });
  }

  mute() {
    return new Promise(resolve => {
      this._player.mute();
      resolve();
    });
  }

  unmute() {
    return new Promise(resolve => {
      this._player.unmute();
      resolve();
    });
  }

  toggleMute() {
    return new Promise(resolve => {
      this._player.toggleMute();
      resolve();
    });
  }

  adjustVolume(amount) {
    return new Promise(resolve => {
      this._player.adjustVolume(amount);
      resolve();
    });
  }

  setVolume(volume) {
    return new Promise(resolve => {
      this._player.setVolume(volume);
      resolve();
    });
  }

  adjustProgress(amount) {
    return new Promise(resolve => {
      this._player.adjustProgress(amount);
      resolve();
    });
  }

  setProgress(progress) {
    return new Promise(resolve => {
      this._player.setProgress(progress);
      resolve();
    });
  }

  //  --------------------------------  COLLECTION METHODS  ---------------------------------  //

  initCollection(response) {
    return new Promise((resolve, reject) => {
      if (response.DONE && response.ERROR_KEY === null) {
        if (response.COLLECTION.length === 0) {
          this._collection.newLibrary();
        }

        else {
          this._collection.buildUserCollection(response); // remove true when loading all playlists
        }

        resolve();
      }

      else {
        reject(response.ERROR_KEY);
      }
    });
  }

  getVolume() { return this._player.getVolume(); }
  getPlayer() { return this._player; }
  getCollection() { return this._collection; }
}

export default Model;
