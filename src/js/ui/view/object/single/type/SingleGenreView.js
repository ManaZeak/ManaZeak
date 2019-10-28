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
    this._name = options.name;
    this._logo = options.logo;

    this._dom = {
      cover: null,
      title: null,
      trackCompo: null,
      country: null,
      play: null,
      tracksContainer: null
    };

    this._init()
      .then(this._processGenre.bind(this))
      .then(this._singleGenreEvents.bind(this))
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

          this._dom.cover.src = this._logo;
          this._dom.title.innerHTML = this._name;
          this._dom.trackCompo.innerHTML = `${response.GENRE.TRACKS.length} ${mzk.lang.playlist.tracks} – ${response.GENRE.DURATION}`;
          this._dom.country.innerHTML = response.GENRE.COUNTRY;

          for (let i = 0; i < set.length; ++i) {
            let entry = new SingleGenreViewTrackEntry({
              trackNumber: i + 1,
              track: set[i]
            });

            this._tracks.push(entry);
            this._dom.trackContainer.appendChild(entry.domFragment);
          }

          new ScrollBar({
            target: this._dom.trackContainer
          });

          console.log(response)
          console.log(set)
          resolve();
        });
    });
  }


  _singleGenreEvents() {
    return new Promise((resolve) => {
      this._dom.trackContainer.addEventListener('click', (event) => {
        this._trackClicked(event);
      });

      this._dom.play.addEventListener('click', () => {
        mzk.changeTrack(this.firstTrackId)
      }, false);
      resolve();
    });
  }



  get dom() {
    return this._dom.wrapper;
  }


}


export default SingleGenreView;
