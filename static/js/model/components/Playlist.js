import Track from './Track.js';
'use_strict';

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
    this._isPublic = options.isPublic
    this._name = options.name;
    this._description = options.description;
    this._owner = options.owner;
    this._avgBitrate = options.averagBitRate;
    this._totalDuration = options.totalDuration;
    this._totalTrack = options.totalTrack;

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
    if (step === 0) {
      this._rawArtists = [];
    }

    let options = {
      PLAYLIST_ID: this._id,
      REQUEST_NUMBER: step
    };

    mzk.komunikator.post('playlist/simplifiedLazyLoading/', options)
      .then((response) => {
        if (response.DONE) {
          this._rawArtists = this._rawArtists.concat(response.RESULT);
          this._getArtistsLazyLoad(step + 1);
        }

        else {
          if (response.ERROR_MSG == "null" || response.ERROR_MSG == "" || response.ERROR_MSG == null) { // Successfully loaded all
            this._convertRawArtists()
              .then(() => { Events.fire(`TrackLoaded-${this._id}`); });
          }

          else {
            console.log('Error');
            //new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
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
  _convertRawArtists() {
    return new Promise(resolve => {
      for (let i = 0; i < this._rawArtists.length; ++i) {
        if (this._rawArtists[i]['Inception'] !== undefined) { // TODO Iterate over album instead of hard code
          var albumTrack = [];

          for (let j = 0; j < this._rawArtists[i]['Inception'].TRACKS.length; ++j) {
            albumTrack.push(new Track({
              album: 'Inception',
              artist: this._rawArtists[i].NAME,
              rawTrack: this._rawArtists[i]['Inception'].TRACKS[j]
            }));
          }

        }

        this._artists.push({
          ids: this._rawArtists[i].IDS,
          name: this._rawArtists[i].NAME,
          albums: {
            id: 1,
            name: 'Inception',
            tracks: albumTrack
          }
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
        let eventOptions = {
          name: `TrackLoaded-${this._id}`,
          oneShot: true
        }

        Events.register(eventOptions, () => { resolve(); });
        this._getArtistsLazyLoad(0);
      }

      else {
        reject(response.ERROR_KEY);
      }
    });
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  getId() { return this._id; }
  getArtists() { return this._artists; }
}

export default Playlist;
