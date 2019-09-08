'use strict';


class AllGenresView {


  constructor() {
    this._dom = {
      wrapper: null
    };

    this._fetchWrapper()
      .then(this._getAllGenres.bind(this))
      .then(this._allGenresViewReady.bind(this));
  }

  _fetchWrapper() {
    return new Promise(resolve => {
      mzk.komunikator.getTemplate('view/tag/allGenres/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');

          this._dom.wrapper = doc.getElementsByClassName('all-genres-page')[0];

          resolve();
        });
    });
  }

  _getAllGenres() {
    return new Promise(resolve => {
      //mzk.komunikator.get(`artist/get/${this._id}`)
      //  .then((artistInfo) => {

          resolve();
      //  });
    });
  }


  _allGenresViewReady() {
    Events.fire('SceneViewReady');
  }


  get dom() {
    return this._dom.wrapper;
  }

}


export default AllGenresView;