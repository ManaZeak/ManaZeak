import SingleTagView from "./SingleTagView";
'use strict';


class SingleAlbumView extends SingleTagView {


  constructor(options) {
    super({
      type: 'album'
    });

    this._id = options.id;
    this._title = options.title;
    this._cover = options.cover;

    this._init()
      .then(this._processAlbum.bind(this))
      .then(this._viewReady.bind(this));
  }


  _processAlbum(response) {
    return new Promise(resolve => {
      //console.log(this);
      resolve();
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default SingleAlbumView;
