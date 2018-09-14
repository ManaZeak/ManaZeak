import Playlist from './Playlist.js'

class Collection {
  constructor() {
    this._playlists = [];
    this._activePlaylist = -1;

    this._init();
  }

  _init() {
    mzk.getCollection();
  }

  addPlaylist(response, activate) {
    let options = {
      id: response.PLAYLIST_IDS[0],
      name: response.PLAYLIST_NAMES[0],
      description: response.PLAYLIST_DESCRIPTIONS[0],
      isLibrary: response.PLAYLIST_IS_LIBRARY[0]
    };

    this._playlists.push(new Playlist(options));
    if (activate) { this._activePlaylist = (this._playlists.length - 1); }

    return this._playlists[this._playlists.length - 1];
  }

  newLibrary() {
    if (!mzk.user.hasPermission('LIBR')) { return; }

    let checkResponse = (response) => {
      if (response.DONE) { let pl = this.addPlaylist(response, true); this.initialScan(pl); }
      else { Errors.raise(response.ERROR_KEY); }
    };

    let options = {
      URL: '/library/tmp7/',
      NAME: 'MZK',
      CONVERT: false
    };

    mzk.komunikator.post('library/new/', options)
      .then(response => { checkResponse(response); })
      .catch(response => { Errors.raise(response, true) });
  }

  initialScan(pl) {
    let options = {
      LIBRARY_ID: pl._id // TODO getter in pl
    };
    mzk.komunikator.post('library/initialScan/', options)
      .then((response) => {
        options = {
          PLAYLIST_ID: response.PLAYLIST_ID
        };

        mzk.komunikator.post('library/checkScanStatus/', options)
          .then((response) => { pl.getTracks(response); });
      });
  }
}

export default Collection;
