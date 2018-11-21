import Player from '../core/Player.js';
import Collection from './components/Collection.js';
'use_strict';

class Model {
  /**
   * @summary ManaZeak frontend model
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle ManaZeak abstract models relative to the current session
   **/
  constructor() {
    this._player = {};
    this._collection = {};
    this._queue = [];
    this._activeTrack = null;

    this._init();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _init
   * @private
   * @memberof Model
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Init player, user collection
   **/
  _init() {
    this._player = new Player();
    this._collection = new Collection();
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  //  --------------------------------  PLAYER METHODS  ---------------------------------  //

  /**
   * @method
   * @name changeTrack
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Change the current track in the player according to the given url
   * @param {string} url - The track url to read stream from
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  changeTrack(id, url) {
    return new Promise(resolve => {
      this._activeTrack = this.getTrackById(id);
      this._player.changeTrack(url).then(resolve);
    });
  }


  /**
   * @method
   * @name togglePlay
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Toggle playback on the player
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  togglePlay() {
    return new Promise(resolve => {
      this._player.togglePlay();
      resolve();
    });
  }

  /**
   * @method
   * @name stopPlayback
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Stop the player playback
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  stopPlayback() {
    return new Promise(resolve => {
      this._player.stop();
      this._activeTrack = null;
      resolve();
    });
  }

  /**
   * @method
   * @name mute
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Mute the player
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  mute() {
    return new Promise(resolve => {
      this._player.mute();
      resolve();
    });
  }

  /**
   * @method
   * @name unmute
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description UnMute the player
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  unmute() {
    return new Promise(resolve => {
      this._player.unmute();
      resolve();
    });
  }

  /**
   * @method
   * @name toggleMute
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Toggle the mute status of the player
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  toggleMute() {
    return new Promise(resolve => {
      this._player.toggleMute();
      resolve();
    });
  }

  /**
   * @method
   * @name adjustVolume
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Adjust the playback volume from a given amount
   * @param {number} amount - Positive or negative float amount of volume in range [-1, 1]
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  adjustVolume(amount) {
    return new Promise(resolve => {
      this._player.adjustVolume(amount);
      resolve();
    });
  }

  /**
   * @method
   * @name setVolume
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Set the playback volume from a given value
   * @param {number} volume - Positive or negative float volume value in range [0, 1]
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  setVolume(volume) {
    return new Promise(resolve => {
      this._player.setVolume(volume);
      resolve();
    });
  }

  /**
   * @method
   * @name adjustProgress
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Adjust the playback progress from a given amount
   * @param {number} amount - Positive or negative float amount of progress in range [-100, 100]
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  adjustProgress(amount) {
    return new Promise(resolve => {
      this._player.adjustProgress(amount);
      resolve();
    });
  }

  /**
   * @method
   * @name setProgress
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Set the playback progress from a given amount
   * @param {number} progress - The progression percentage [0, 100]
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  setProgress(progress) {
    return new Promise(resolve => {
      this._player.setProgress(progress);
      resolve();
    });
  }

  //  --------------------------------  COLLECTION METHODS  ---------------------------------  //

  /**
   * @method
   * @name initCollection
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Init user colletion according to user response (from controller mzk.js)
   * @param {object} response - The server reponse object
   * @param {boolean} response.DONE - The request status
   * @param {string} response.ERROR_KEY - The error key to eventually use
   * @param {array} response.COLLECTION - The raw user collection
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  initCollection(response) {
    return new Promise((resolve, reject) => {
      if (response.DONE && response.ERROR_KEY === null) {
        if (response.COLLECTION.length === 0) {
          this._collection.newLibrary()
            .then(() => {
              resolve(this._collection.activePlaylist);
            });
        } else {
          this._collection.buildUserCollection(response)
            .then(() => {
              resolve(this._collection.activePlaylist);
            });
        }
      } else {
        reject(response.ERROR_KEY);
      }
    });
  }

  setActiveView(newView) {
    return new Promise((resolve) => {
      this._collection.activePlaylist.activeView = newView;
      resolve();
    });
  }

  get activeView() {
    return this._collection.activePlaylist.activeView;
  }

  /**
   * @method
   * @name getTrackById
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Returns the track that match the given id, searching in full user collection (obviously brutal)
   * @param {number} id - The track id to get in collections
   * @returns {object} - The matching track or null
   **/
  getTrackById(id) {
    for (let i = 0; i < this._collection._playlists.length; ++i) {
      for (let j = 0; j < this._collection._playlists[i]._artists.length; ++j) {
        for (let k = 0; k < this._collection._playlists[i]._artists[j].albums.length; ++k) {
          for (let l = 0; l < this._collection._playlists[i]._artists[j].albums[k].tracks.length; ++l) {
            if (this._collection._playlists[i]._artists[j].albums[k].tracks[l].id === id) {
              return this._collection._playlists[i]._artists[j].albums[k].tracks[l];
            }
          }
        }
      }
    }

    return null;
  }

  toggleRepeatMode() {
    return new Promise(resolve => {
      this._collection.activePlaylist.toggleRepeatMode();
      resolve(this._collection.activePlaylist.repeatMode);
    });
  }

  repeatTrack() {
    this._player.repeatTrack();
  }

  appendToQueue(id) {
    this._queue.push(id);
  }

  getNextFromQueue() {
    const id = this._queue[0];

    if (this._queue.length > 0) {
      this._queue.splice(0, 1);
    }

    return id;
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  get repeatMode() {
    return this._collection.activePlaylist.repeatMode;
  }

  get queuedTracks() {
    const queuedTracks = [];

    for (let i = 0; i < this._queue.length; ++i) {
      const index = this._queue[i];

      const track = this.getTrackById(index);

      if (track) {
        queuedTracks.push(track);
      }
    }

    return queuedTracks;
  }

  getVolume() {
    return this._player.getVolume();
  }
  getPlayer() {
    return this._player;
  }
  getCollection() {
    return this._collection;
  }
  getActiveTrack() {
    return this._activeTrack;
  }

  get queue() {
    return this._queue;
  }
}

export default Model;
