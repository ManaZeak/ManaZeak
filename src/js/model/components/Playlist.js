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
    this._shuffleMode = 0; // 0 = off | 1 = shuffle | 2 = random
    this._activeView = ViewEnum.ListView;

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
   * @param {number} offset - The lazy load offset (begin at 0, then from server response)
   **/
  _getArtistsLazyLoad(offset) {
    const options = {
      PLAYLIST_ID: this._id,
      OFFSET: offset
    };

    mzk.komunikator.post('playlist/simplifiedLazyLoading/', options)
      .then((response) => {
        if (response.DONE) {
          this._convertRawArtists(response.RESULT)
            .then(() => {
              this._getArtistsLazyLoad(response.OFFSET);
            });
        } else {
          if (response.ERROR_MSG === undefined) { // Successfully loaded all
            Events.fire(`TrackLoaded-${this._id}`);
          } else {
            console.log('Error');
          }
        }
      })
      .catch(errorCode => {
        Logger.raise({
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

        const lastArtist = this._artists[this._artists.length - 1];
        if (lastArtist !== undefined && lastArtist.name === rawArtistsArray[i].NAME) { // We need to albums properly only if matching
          this._concatRawIntoArtists(lastArtist, rawArtistsArray[i].ALBUMS[0], albums); // We send the first album of the newly created
        } else { // We create a new artist otherwise
          this._artists.push({
            ids: rawArtistsArray[i].IDS,
            name: rawArtistsArray[i].NAME,
            albums: albums
          });
        }
      }

      resolve();
    });
  }


  /**
   * @method
   * @name _concatRawIntoArtists
   * @private
   * @memberof Playlist
   * @author Arthur Beaulieu
   * @since March 2019
   * @description <blockquote>Concat raw albums in registered last artists (to keep artists integrity over lazy-loading).
   * We need to connect here the first block with the last previous loaded block in Playlist internals.</blockquote>
   * @param {object} lastArtist - the last registered artists (shortcut use)
   * @param {object} rawAlbum - the first raw album newly created from lazy-loading
   * @param {array} newAlbums - the newly created albums
   **/
  _concatRawIntoArtists(lastArtist, rawAlbum, newAlbums) {
    const lastAlbum = lastArtist.albums[lastArtist.albums.length - 1];
    if (lastAlbum !== undefined && lastAlbum.name === rawAlbum.NAME) { // If lastAlbum match, we concat it
      this._artists[this._artists.length - 1].albums[lastArtist.albums.length - 1].tracks = lastAlbum.tracks.concat(newAlbums[0].tracks);
      for (let k = 1; k < newAlbums.length; ++k) {
         this._artists[this._artists.length - 1].albums.push(newAlbums[k]);
      }
    } else {// We concat albums into album otherwise
      this._artists[this._artists.length - 1].albums = lastArtist.albums.concat(newAlbums);
    }
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


  toggleShuffleMode() {
    this._shuffleMode = (this._shuffleMode + 1) % 3;
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  get repeatMode() {
    return this._repeatMode;
  }

  get shuffleMode() {
    return this._shuffleMode;
  }

  get id() {
    return this._id;
  }

  get artists() {
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
