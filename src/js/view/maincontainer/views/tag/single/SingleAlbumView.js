import SingleTagView from "./SingleTagView";
import ScrollBar from "../../../../utils/ScrollBar";
'use strict';


class SingleAlbumView extends SingleTagView {


  constructor(options) {
    super({
      type: 'album'
    });

    this._id = options.id;
    this._title = options.title;
    this._cover = options.cover;

    this._dom = {
      cover: null
    };

    this._init()
      .then(this._processAlbum.bind(this))
      .then(this._viewReady);
  }


  _processAlbum(album) {
    return new Promise(resolve => {
      console.log(album)

      this._dom.trackContainer = this._dom.wrapper.getElementsByClassName('album-tracks')[0];
      this._dom.cover = this._dom.wrapper.getElementsByClassName('album-cover')[0];

      this._dom.cover.src = this._cover;

      new ScrollBar({
        target: this._dom.trackContainer
      });

      //this._dom.wrapper.appendChild();
      resolve();
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default SingleAlbumView;
