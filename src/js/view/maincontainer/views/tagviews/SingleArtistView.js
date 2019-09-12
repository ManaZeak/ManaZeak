'use strict';


class SingleArtistView {


  constructor(options) {
    this._id = options.id;
    this._name = options.name;
    this._pp = options.pp;

    this._dom = {
      wrapper: null
    };

    this._fetchWrapper()
      .then(this._getArtistDetailedInfo.bind(this))
      .then(this._singleArtistViewReady.bind(this));
  }


  _fetchWrapper() {
    return new Promise(resolve => {
      mzk.komunikator.getTemplate('view/single/artist/layout/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');

          this._dom.wrapper = doc.getElementsByClassName('single-artist-page')[0];

          resolve();
        });
    });
  }

  _getArtistDetailedInfo() {
    return new Promise(resolve => {
      //mzk.komunikator.get(`artist/get/${this._id}`)
      //  .then((artistInfo) => {

          resolve();
      //  });
    });
  }


  _singleArtistViewReady() {
    Events.fire('SceneViewReady');
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default SingleArtistView;