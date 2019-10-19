import SingleTagView from "../SingleTagView";
'use strict';


class SingleGenreView extends SingleTagView {


  constructor(options) {
    super({
      type: 'genre'
    });

    this._id = options.id;
    this._name = options.name;
    this._logo = options.logo;

    this._init()
      .then(this._processGenre.bind(this))
      .then(this._viewReady);
  }


  _processGenre(response) {
    return new Promise(resolve => {
      resolve();
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default SingleGenreView;
