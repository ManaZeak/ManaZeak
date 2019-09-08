'use strict';


class AllAlbumsView {


  constructor() {
    this._dom = {
      wrapper: null
    };

    this._fetchWrapper()
      .then(this._getAllAlbums.bind(this))
      .then(this._allAlbumsViewReady.bind(this));
  }

  _fetchWrapper() {
    return new Promise(resolve => {
      mzk.komunikator.getTemplate('view/tag/allAlbums/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');

          this._dom.wrapper = doc.getElementsByClassName('all-albums-page')[0];

          resolve();
        });
    });
  }

  _getAllAlbums() {
    return new Promise(resolve => {
      //mzk.komunikator.get(`artist/get/${this._id}`)
      //  .then((artistInfo) => {

          resolve();
      //  });
    });
  }


  _allAlbumsViewReady() {
    Events.fire('SceneViewReady');
  }


  get dom() {
    return this._dom.wrapper;
  }

}


export default AllAlbumsView;