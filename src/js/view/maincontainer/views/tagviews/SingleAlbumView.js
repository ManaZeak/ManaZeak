'use strict';


class SingleAlbumView {


  constructor(options) {
    this._id = options.id;
    this._title = options.title;
    this._cover = options.cover;

    this._dom = {
      wrapper: null
    };

    this._fetchWrapper()
      .then(this._getAlbumDetailedInfo.bind(this))
      .then(this._singleAlbumViewReady.bind(this));
  }

  _fetchWrapper() {
    return new Promise(resolve => {
      mzk.komunikator.getTemplate('view/tag/singleAlbum/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');

          this._dom.wrapper = doc.getElementsByClassName('single-album-page')[0];

          resolve();
        });
    });
  }

  _getAlbumDetailedInfo() {
    return new Promise(resolve => {
      //mzk.komunikator.get(`artist/get/${this._id}`)
      //  .then((artistInfo) => {

          resolve();
      //  });
    });
  }


  _singleAlbumViewReady() {
    Events.fire('SceneViewReady');
  }


  get dom() {
    return this._dom.wrapper;
  }

}


export default SingleAlbumView;