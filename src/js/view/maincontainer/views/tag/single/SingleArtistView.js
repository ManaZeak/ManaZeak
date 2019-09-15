import SingleTagView from "./SingleTagView";
'use strict';


class SingleArtistView extends SingleTagView {


  constructor(options) {
    super({
      type: 'artist'
    });

    this._id = options.id;
    this._name = options.name;
    this._pp = options.pp;

    this._init()
      .then(this._processArtist.bind(this))
      .then(this._viewReady);
  }


  _processArtist(response) {
    return new Promise(resolve => {
      //console.log(this);
      resolve();
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default SingleArtistView;
