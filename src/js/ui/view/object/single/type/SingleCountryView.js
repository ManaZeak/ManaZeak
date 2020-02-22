import SingleTagView from "../SingleTagView";
import ScrollBar from "../../../../component/bar/ScrollBar";
import SingleAlbumViewTrackEntry from "../entry/SingleAlbumViewTrackEntry";
'use strict';


class SingleCountryView extends SingleTagView {


  constructor(options) {
    super({
      type: 'country'
    });

    this._id = options.id;

    this._dom = {
      cover: null,
      title: null,
      albumArtist: null,
      yearLabel: null,
      trackCompo: null,
      country: null,
      genres: null,
      tracksContainer: null
    };

    this._init()
      .then(this._processCountry.bind(this))
      .then(this._setupContext.bind(this))
      //.then(this._singleTagEvents.bind(this))
      .then(this._viewReady);
  }


  _processCountry(response) {
    return new Promise(resolve => {

      this._dom.play = this._dom.wrapper.getElementsByClassName('play-album')[0];
      this._dom.cover = this._dom.wrapper.getElementsByClassName('album-cover')[0];
      this._dom.title = this._dom.wrapper.getElementsByClassName('album-title')[0];
      this._dom.albumArtist = this._dom.wrapper.getElementsByClassName('album-artist')[0];
      this._dom.yearLabel = this._dom.wrapper.getElementsByClassName('album-year-label')[0];
      this._dom.trackCompo = this._dom.wrapper.getElementsByClassName('album-track-composition')[0];
      this._dom.country = this._dom.wrapper.getElementsByClassName('album-country')[0];
      this._dom.genres = this._dom.wrapper.getElementsByClassName('album-genres')[0];
      this._dom.trackContainer = this._dom.wrapper.getElementsByClassName('album-tracks')[0];

      //this._dom.cover.src = response.ALBUM.COVER;
      //this._dom.title.innerHTML = response.ALBUM.NAME;

      resolve();
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default SingleCountryView;
