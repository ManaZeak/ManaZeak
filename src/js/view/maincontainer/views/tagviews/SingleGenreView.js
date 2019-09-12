'use strict';


class SingleGenreView {


  constructor(options) {
    this._id = options.id;
    this._name = options.name;
    this._img = options.img;

    this._dom = {
      wrapper: null
    };

    this._fetchWrapper()
      .then(this._getGenreDetailedInfo.bind(this))
      .then(this._singleGenreViewReady.bind(this));
  }

  _fetchWrapper() {
    return new Promise(resolve => {
      mzk.komunikator.getTemplate('view/single/genre/layout/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');

          this._dom.wrapper = doc.getElementsByClassName('single-genre-page')[0];

          resolve();
        });
    });
  }

  _getGenreDetailedInfo() {
    return new Promise(resolve => {
      //mzk.komunikator.get(`artist/get/${this._id}`)
      //  .then((artistInfo) => {

          resolve();
      //  });
    });
  }


  _singleGenreViewReady() {
    Events.fire('SceneViewReady');
  }


  get dom() {
    return this._dom.wrapper;
  }

}


export default SingleGenreView;