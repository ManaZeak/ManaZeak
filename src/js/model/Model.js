import Player from '../core/Player.js';
import Collection from './components/Collection.js';
import Track from "./components/Track";
'use strict';

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
    this._transitiveSet = []; // Custom view need transitive set of track
    this._queue = [];
    this._playingTrack = null;

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
      this._playingTrack = this.getTrackById(id);
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
      this._playingTrack = null;
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
      this._player.volume = volume;
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
      this._player.progress = progress;
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
          // We start loading in Collection._initialScan, when the new library modal is triggered with good values
          this._collection.newLibrary()
            .then(resolve);
        } else {
          this._collection.buildUserCollection(response)
            .then(resolve);
        }
      } else {
        reject(response.ERROR_KEY);
      }
    });
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


  //  --------------------------------  TRANSITIVE SETS METHOD  ---------------------------------  //


  makeTransitiveSet(options) {
    return new Promise((resolve, reject) => {
      let set = [];
      for (let i = 0; i < options.tracks.length; ++i) {
        try {
          set.push(new Track({
            album: options.album,
            albumArtist: options.albumArtist,
            rawTrack: options.tracks[i]
          }));
        } catch(e) {
          reject(e)
        }
      }

      this._transitiveSet.push(set);
      resolve(set);
    });
  }


  toggleRepeatMode() {
    return new Promise(resolve => {
      this._collection.activePlaylist.toggleRepeatMode();
      resolve(this._collection.activePlaylist.repeatMode);
    });
  }

  toggleShuffleMode() {
    return new Promise(resolve => {
      this._collection.activePlaylist.toggleShuffleMode();
      resolve(this._collection.activePlaylist.shuffleMode);
    });
  }


  repeatTrack() {
    this._player.repeatTrack();
  }


  appendToQueue(id) {
    // Queue is exclusive. To make it an option, just change the test
    if (this._queue.indexOf(id) === -1) {
      this._queue.push(id);
    }
  }


  getNextFromQueue() {
    const id = this._queue[0];

    if (this._queue.length > 0) {
      this._queue.splice(0, 1);
    }

    return id;
  }


  swapQueueUp(index) {
    if (this._queue.length > index) {
      const swap = this._queue[index - 1];
      this._queue[index - 1] = this._queue[index];
      this._queue[index] = swap;
    }

    mzk.setQueueFromArray(this._getQueuedTracks());
  }


  swapQueueDown(index) {
    if (index >= 0) {
      const swap = this._queue[index + 1];
      this._queue[index + 1] = this._queue[index];
      this._queue[index] = swap;
    }

    mzk.setQueueFromArray(this._getQueuedTracks());
  }


  removeFromQueue(index) {
    if (index >= 0 && index < this._queue.length) {
      this._queue.splice(index, 1);
    }

    mzk.setQueueFromArray(this._getQueuedTracks());
  }


  setQueueFromArray(queuedTracks) {
    return new Promise(resolve => {
      this._queue = []; // Clear old queue

      for (let i = 0; i < queuedTracks.length; ++i) {
        if (this._queue.indexOf(queuedTracks[i].id) === -1) {
          this._queue.push(queuedTracks[i].id);
        }
      }

      resolve(queuedTracks);
    });
  }


  _getQueuedTracks() {
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


  isLastAlbumTrack(id) {
    // TODO get total track from serv and ask for track in model instead of getTrack
    for (let i = 0; i < this._collection._playlists.length; ++i) {
      for (let j = 0; j < this._collection._playlists[i]._artists.length; ++j) {
        for (let k = 0; k < this._collection._playlists[i]._artists[j].albums.length; ++k) {
          for (let l = 0; l < this._collection._playlists[i]._artists[j].albums[k].tracks.length; ++l) {
            if (this._collection._playlists[i]._artists[j].albums[k].tracks[l].id === id && this._collection._playlists[i]._artists[j].albums[k].tracks.length - 1 === l) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }


  setActiveView(newView) {
    return new Promise((resolve) => {
      this._collection.activePlaylist.activeView = newView;
      resolve();
    });
  }


  //  --------------------------------  GETTER METHODS   --------------------------------  //

  get repeatMode() {
    return this._collection.activePlaylist.repeatMode;
  }

  get shuffleMode() {
    return this._collection.activePlaylist.shuffleMode;
  }

  get id() {
    return this._collection.activePlaylist.id;
  }

  get player() {
    return this._player;
  }

  get activeView() {
      return this._collection.activePlaylist.activeView;
  }

  get collection() {
    return this._collection;
  }

  get playingTrack() {
    return this._playingTrack;
  }

  get queue() {
    return this._queue;
  }

  get queuedTracks() {
    return this._getQueuedTracks();
  }
}

export default Model;
