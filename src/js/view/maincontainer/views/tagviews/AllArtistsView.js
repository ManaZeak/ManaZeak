'use strict';


class AllArtistsView {


  constructor() {
    this._dom = {
      wrapper: null
    };

    this._fetchWrapper()
      .then(this._getAllArtists.bind(this))
      .then(this._allArtistsViewReady.bind(this));
  }

  _fetchWrapper() {
    return new Promise(resolve => {
      mzk.komunikator.getTemplate('view/tag/allArtists/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');

          this._dom.wrapper = doc.getElementsByClassName('all-artists-page')[0];

          resolve();
        });
    });
  }

  _getAllArtists() {
    return new Promise(resolve => {
      //mzk.komunikator.get(`artist/get/${this._id}`)
      //  .then((artistInfo) => {

          resolve();
      //  });
    });
  }


  _allArtistsViewReady() {
    Events.fire('SceneViewReady');
  }


  get dom() {
    return this._dom.wrapper;
  }

}


export default AllArtistsView;