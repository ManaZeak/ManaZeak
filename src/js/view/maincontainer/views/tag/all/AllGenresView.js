import AllTagsView from "./AllTagsView";
'use strict';


class AllGenresView extends AllTagsView {


  constructor() {
    super({
      type: 'genre'
    });

    this._dom = {
      wrapper: null
    };

    this._init()
      .then(this._processAllGenres.bind(this))
      .then(this._viewReady.bind(this));
  }


  _processAllGenres(response) {
    return new Promise(resolve => {
      resolve();
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default AllGenresView;