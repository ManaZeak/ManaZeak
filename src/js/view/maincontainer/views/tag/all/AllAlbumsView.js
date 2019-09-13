import AllTagsView from "./AllTagsView";
'use strict';


class AllAlbumsView extends AllTagsView {


  constructor() {
    super({
      type: 'album'
    });

    this._dom = {
      wrapper: null
    };

    this._init()
      .then(this._processAllAlbums.bind(this))
      .then(this._viewReady.bind(this));
  }


  _processAllAlbums(response) {
    return new Promise(resolve => {
      resolve();
    });
  }


  get dom() {
    return this._dom.wrapper;
  }

}


export default AllAlbumsView;