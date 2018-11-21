import Track from './Track.js';
'use strict';

class Playlist {
  /**
   * @summary ManaZeak Playlist class
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Playlist object that stores all information about a single playlist
   * @param {object} options - The playlist information
   * @param {number} options.id - The playlist id
   * @param {boolean} options.isLibrary - Is playlist a library
   * @param {boolean} options.isPublic - Is playlist public
   * @param {string} options.name - The playlist name
   * @param {string} options.description - The playlist description
   * @param {string} options.owner - The playlist owner
   * @param {number} options.averageBitRate - The playlist average bitrate
   * @param {number} options.totalDuration - The playlist total duration
   * @param {number} options.totalTrack - The playlist total track
   **/
  constructor(options) {
    this._id = options.id;
    this._isLibrary = options.isLibrary;
    this._isPublic = options.isPublic;
    this._name = options.name;
    this._description = options.description;
    this._owner = options.owner;
    this._avgBitrate = options.averagBitRate;
    this._totalDuration = options.totalDuration;
    this._totalTrack = options.totalTrack;
    this._repeatMode = 0; // 0 = off | 1 = one | 2 = all
    this._activeView = ViewEnum.AlbumView;

    this._rawArtists = []; // Artist array that contains albums array that contains tracks array
    this._artists = [];
    this._tracks = [];
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _getArtistsLazyLoad
   * @private
   * @memberof Playlist
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Fetch a bunch of tracks
   * @param {number} step - The lazy load call number
   **/
  _getArtistsLazyLoad(step) {
    const options = {
      PLAYLIST_ID: this._id,
      REQUEST_NUMBER: step
    };

    mzk.komunikator.post('playlist/simplifiedLazyLoading/', options)
      .then((response) => {
        if (response.DONE) {
          this._convertRawArtists(response.RESULT)
            .then(() => {
              this._getArtistsLazyLoad(step + 1);
            });
        } else {
          if (response.ERROR_MSG == "null" || response.ERROR_MSG == "" || response.ERROR_MSG == null) { // Successfully loaded all
            Events.fire(`TrackLoaded-${this._id}`);
          } else {
            console.log('Error');
          }
        }
      })
      .catch(errorCode => {
        Errors.raise({
          code: errorCode,
          frontend: true
        });
      });
  }

  /**
   * @method
   * @name _convertRawArtists
   * @private
   * @memberof Playlist
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Convert raw artists into cleansed object
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _convertRawArtists(rawArtistsArray) {
    return new Promise(resolve => {
      for (let i = 0; i < rawArtistsArray.length; ++i) {
        const albums = [];
        for (let j = 0; j < rawArtistsArray[i].ALBUMS.length; ++j) {
          const tracks = [];
          for (let k = 0; k < rawArtistsArray[i].ALBUMS[j].TRACKS.length; ++k) {
            tracks.push(new Track({
              album: rawArtistsArray[i].ALBUMS[j],
              artist: rawArtistsArray[i].NAME,
              rawTrack: rawArtistsArray[i].ALBUMS[j].TRACKS[k]
            }));
          }

          albums.push({
            id: rawArtistsArray[i].ALBUMS[j].ID,
            name: rawArtistsArray[i].ALBUMS[j].NAME,
            tracks: tracks
          });
        }

        this._artists.push({
          ids: rawArtistsArray[i].IDS,
          name: rawArtistsArray[i].NAME,
          albums: albums
        });
      }

      resolve();
    });
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name getArtistsFromServer
   * @public
   * @memberof Playlist
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Get playlist relative artists object from server
   * @param {object} response - The server reponse object
   * @param {boolean} response.DONE - The request status
   * @param {string} response.ERROR_KEY - The error key to eventually use
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  getArtistsFromServer(response) {
    return new Promise((resolve, reject) => {
      if (response.DONE) {
        const eventOptions = {
          name: `TrackLoaded-${this._id}`,
          oneShot: true // Event needs to be dismissed after request completion
        };

        Events.register(eventOptions, () => {
          resolve();
        });
        this._getArtistsLazyLoad(0);
      } else {
        reject(response.ERROR_KEY);
      }
    });
  }

  toggleRepeatMode() {
    this._repeatMode = (this._repeatMode + 1) % 3;
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  get repeatMode() {
    return this._repeatMode;
  }

  getId() {
    return this._id;
  }
  getArtists() {
    return this._artists;
  }

  get activeView() {
    return this._activeView;
  }

  set activeView(newView) {
    this._activeView = newView;
  }
}

export default Playlist;
