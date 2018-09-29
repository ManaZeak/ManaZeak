import Playlist from './Playlist.js'

class Collection {
  constructor() {
    this._playlists = [];
    this._activePlaylist = -1;

    this._init();
  }

  _init() {
    //mzk.getCollection();
  }

  buildUserCollection(response) {
    for (let i = 0; i < response.COLLECTION.length; ++i) {
      this._buildPlaylist(response.COLLECTION[i]);
      this._playlists[this._playlists.length - 1].getTracksFromServer(response);
    }

    //this.initialScan(this._playlists[0]);
    this._activePlaylist = this._playlists[0]; // TODO : store in ack user latest active playlist
  }

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

    this._playlists.push(new Playlist(options));
  }

  newLibrary() {
    if (!mzk.user.hasPermission('LIBR')) { return; }

    let checkResponse = (response) => {
      if (response.DONE) {
        this._buildPlaylist(response);
        this.initialScan(this._playlists[0]);
        this._activePlaylist = this._playlists[0];
      }

      else {
        Errors.raise({ code: response.ERROR_KEY, frontend: false });
      }
    };

    let options = {
      URL: '/library/tmp7',
      NAME: 'MZK',
      CONVERT: false
    };

    mzk.komunikator.post('library/new/', options)
      .then(response => { checkResponse(response); })
      .catch(response => { Errors.raise({ code: response, frontend: true }) });
  }

  initialScan(pl) {
    let options = {
      LIBRARY_ID: pl._id // TODO getter in pl
    };

    mzk.komunikator.post('library/initialScan/', options)
      .then((response) => {
        this.checkScanStatus(response, pl);
      });
  }

  checkScanStatus(response, pl) {
    let options = {};
    let intervalId = -1;

    let a = () => {
      options = {
        PLAYLIST_ID: response.PLAYLIST_ID
      };

      mzk.komunikator.post('library/checkScanStatus/', options)
        .then((response) => {
          if (response.DONE === true) {
            clearInterval(intervalId);
            intervalId = -1;
            pl.getTracksFromServer(response);
          }
        });
    };

    intervalId = setInterval(() => {
      a();
    }, 500);
  }
}

export default Collection;
