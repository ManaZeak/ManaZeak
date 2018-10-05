import Playlist from './Playlist.js';
'use_strict';

class Collection {
  /**
  * @summary ManaZeak Collection class
  * @author Arthur Beaulieu
  * @since September 2018
  * @description Handle the user collection of playlists. It contains both the ManaZeak libraries, the usr playlist, and in a near future, shared playlist from other users
  **/
  constructor() {
    this._playlists = [];
    this._activePlaylist = -1;
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
  * @method
  * @name _initialScan
  * @private
  * @memberof Collection
  * @author Arthur Beaulieu
  * @since September 2018
  * @description Ask the server to perform an initial scan server side (use on a newly created library only)
  * @param {object} playlist - The new playlist (library)
  * @returns {Promise} - A promise that resolve when logic has been executed
  **/
  _initialScan(playlist) {
    return new Promise((resolve) => {
      let options = {
        LIBRARY_ID: playlist.getId() // TODO getter in pl
      };

      mzk.komunikator.post('library/initialScan/', options)
        .then(() => { return this._checkScanStatus(playlist); })
        .then(resolve);
    });
  }

  /**
  * @method
  * @name checkScanStatus
  * @private
  * @memberof Collection
  * @author Arthur Beaulieu
  * @since September 2018
  * @description Ask the server until a library have been scanned and request tracks for it
  * @description Method that recurse with an interval to ask the server if a library have been fully scanned (use on a newly created library only, after _initialScan only)
  * @param {object} playlist - The new playlist (library)
  * @returns {Promise} - A promise that resolve when logic has been executed
  **/
  _checkScanStatus(playlist) {
    return new Promise((resolve, reject) => {
      let intervalId = -1;
      let options = {
        PLAYLIST_ID: playlist.getId()
      };

      let checkStatus = () => {
        mzk.komunikator.post('library/checkScanStatus/', options)
          .then((response) => {
            if (response.DONE === true) {
              clearInterval(intervalId);
              playlist.getArtistsFromServer(response)
                .then(resolve)
                .catch(errorCode => { Errors.raise({ code: errorCode, frontend: false }); reject() });
            }
          })
          .catch(errorCode => { Errors.raise({ code: errorCode, frontend: true }); reject() });
      };

      intervalId = setInterval(() => {
        checkStatus();
      }, 500);
    });
  }

  /**
  * @method
  * @name _buildPlaylist
  * @private
  * @memberof Collection
  * @author Arthur Beaulieu
  * @since September 2018
  * @description Builds a new playlist from a server response
  * @param {object} playlist - The raw playlist to build
  * @param {object} playlist.INFO - The playlist information
  * @param {number} playlist.INFO.ID - The playlist id
  * @param {boolean} playlist.INFO.IS_LIBRARY - The playlist id
  * @param {boolean} playlist.INFO.IS_PUBLIC - The playlist id
  * @param {string} playlist.INFO.NAME - The playlist name
  * @param {string} playlist.INFO.DESCRIPTION - The playlist description
  * @param {string} playlist.INFO.OWNER - The playlist owner
  * @param {number} playlist.INFO.AVERAGE_BITRATE - The playlist average bitrate
  * @param {number} playlist.INFO.TOTAL_DURATION - The playlist total duration
  * @param {number} playlist.INFO.TOTAL_TRACK - The playlist total track
  **/
  _buildPlaylist(playlist) {
    let options = {
      id: playlist.INFO.ID,
      isLibrary: playlist.INFO.IS_LIBRARY,
      isPublic: playlist.INFO.IS_PUBLIC,
      name: playlist.INFO.NAME,
      description: playlist.INFO.DESCRIPTION,
      owner: playlist.INFO.OWNER,
      averagBitRate: playlist.INFO.AVERAGE_BITRATE,
      totalDuration: playlist.INFO.TOTAL_DURATION,
      totalTrack: playlist.INFO.TOTAL_TRACK
    };
    // TODO handle playlist.VIEW
    this._playlists.push(new Playlist(options));
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
  * @method
  * @name buildUserCollection
  * @public
  * @memberof Collection
  * @author Arthur Beaulieu
  * @since September 2018
  * @description Get playlist relative artists object from server
  * @param {object} response - The server reponse object
  * @param {boolean} response.DONE - The request status
  * @param {string} response.ERROR_KEY - The error key to eventually use
  * @param {array} response.COLLECTION - The user collection of playlists
  * @returns {Promise} - A promise that resolve when logic has been executed
  **/
  buildUserCollection(response) {
    return new Promise(resolve => {
      for (let i = 0; i < response.COLLECTION.length; ++i) {
        this._buildPlaylist(response.COLLECTION[i]);
        this._playlists[this._playlists.length - 1].getArtistsFromServer(response)
          .then(() => {
            this._activePlaylist = 0; // TODO : store in ack user latest active playlist (keep the I index)
            resolve();
          });
      }
    });
  }

  /**
  * @method
  * @name newLibrary
  * @public
  * @memberof Collection
  * @author Arthur Beaulieu
  * @since September 2018
  * @description Get playlist relative artists object from server
  * @returns {Promise} - A promise that resolve when logic has been executed
  **/
  newLibrary() {
    return new Promise((resolve) => {
      if (!mzk.user.hasPermission('LIBR')) { return; }

      let checkResponse = (response) => {
        if (response.DONE) {
          this._activePlaylist = 0;
          this._buildPlaylist(response);
          this._initialScan(this._playlists[0])
            .then(resolve);
        }

        else {
          Errors.raise({ code: response.ERROR_KEY, frontend: false });
        }
      };

      let options = {
        URL: '/library/tmp7',
        NAME: 'MZK2',
        CONVERT: false
      };

      mzk.komunikator.post('library/new/', options)
        .then(response => { checkResponse(response); })
        .catch(response => { Errors.raise({ code: response, frontend: true }) });
    });
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  getActivePlaylist() { return this._playlists[this._activePlaylist]; }
}

export default Collection;
