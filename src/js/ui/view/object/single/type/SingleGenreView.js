import SingleTagView from "../SingleTagView";
import ScrollBar from "../../../../component/bar/ScrollBar";
import SingleGenreViewTrackEntry from "../entry/SingleGenreViewTrackEntry";
'use strict';


class SingleGenreView extends SingleTagView {


  constructor(options) {
    super({
      type: 'genre'
    });

    this._id = options.id;

    this._dom = {
      cover: null,
      title: null,
      trackCompo: null,
      country: null,
      play: null,
      trackContainer: null
    };

    this._init()
      .then(this._processGenre.bind(this))
      .then(this._setupContext.bind(this))
      .then(this._singleTagEvents.bind(this))
      .then(this._viewReady);
  }


  _processGenre(response) {
    return new Promise(resolve => {
      mzk.model.makeTransitiveSet({
          tracks: response.GENRE.TRACKS
        })
        .then(set => {
          this._dom.play = this._dom.wrapper.getElementsByClassName('play-album')[0];
          this._dom.cover = this._dom.wrapper.getElementsByClassName('album-cover')[0];
          this._dom.title = this._dom.wrapper.getElementsByClassName('album-title')[0];
          this._dom.trackCompo = this._dom.wrapper.getElementsByClassName('album-track-composition')[0];
          this._dom.country = this._dom.wrapper.getElementsByClassName('album-country')[0];
          this._dom.trackContainer = this._dom.wrapper.getElementsByClassName('album-tracks')[0];

          this._dom.cover.src = response.GENRE.PICTURE;
          this._dom.title.innerHTML = response.GENRE.NAME;
          this._dom.trackCompo.innerHTML = `${response.GENRE.TOTAL_ARTIST} ${mzk.lang.playlist.artists} – ${response.GENRE.TRACKS.length} ${mzk.lang.playlist.tracks} – ${response.GENRE.DURATION}`;
          this._dom.country.innerHTML = response.GENRE.COUNTRY;

          for (let i = 0; i < set.length; ++i) {
            const entry = new SingleGenreViewTrackEntry({
              trackNumber: i + 1,
              track: set[i]
            });

            this._tracks.push(entry);
            this._dom.trackContainer.appendChild(entry.domFragment);
          }

          new ScrollBar({
            target: this._dom.trackContainer
          });

          resolve();
        });
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default SingleGenreView;
