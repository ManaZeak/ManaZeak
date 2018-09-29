class Playlist {
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

    this.rawTracks = [];
  }

  _getTracksLazy(step) {
    if (step === 0) {
      this.rawTracks = [];
    }

    let options = {
      PLAYLIST_ID: this._id,
      REQUEST_NUMBER: step
    };

    mzk.komunikator.post('playlist/simplifiedLazyLoading/', options)
      .then((response) => {
        /* response = {
         *     DONE        : bool
         *     ERROR_H1    : string
         *     ERROR_MSG   : string
         *
         *     RESULT: [
         *         ID:
         *         TITLE:
         *         YEAR:
         *         COMPOSER:
         *         PERFORMER:
         *         BITRATE:
         *         DURATION:
         *         COVER:
         *         ARTISTS:
         *         GENRE:
         *         ALBUM: {
         *             ID:
         *             TITLE:
         *         }
         *     ]
         * } */
        if (response.DONE) {
          console.log(response);
          this.rawTracks = this.rawTracks.concat(response.RESULT);
          this._getTracksLazy(step + 1);
        }

        else {
          if (response.ERROR_MSG == "null" || response.ERROR_MSG == "" || response.ERROR_MSG == null) { // Successfully loaded all
            //this._fillTracks(this.rawTracks);
            //that.refreshViews();
  //          that.lazyLoadOK = true;
  console.log('Termin', response, this);
//            if (callback) {
//              that.activate();
//              callback();
//            }
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


  getTracksFromServer(response) {
    this._getTracksLazy(0);

    if (response.DONE) {} else {
      console.log(response);
    }
  }
}

export default Playlist;
