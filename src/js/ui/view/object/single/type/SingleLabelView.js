import SingleTagView from "../SingleTagView";
import SingleReleaseArtistViewTrackEntry from "../entry/SingleReleaseArtistViewTrackEntry";
import ScrollBar from "../../../../component/bar/ScrollBar";
'use strict';


class SingleLabelView extends SingleTagView {


  constructor(options) {
    super({
      type: 'label'
    });

    this._id = options.id;

    this._dom = {
      cover: null,
      title: null,
      trackCompo: null,
      artistLabel: null,
      country: null,
      play: null,
      albumContainer: null,
      trackContainer: null
    };

    this._init()
      .then(this._processLabel.bind(this))
      .then(this._setupContext.bind(this))
      .then(this._singleTagEvents.bind(this))
      .then(this._viewReady);
  }


  _processLabel(response) {
    return new Promise(resolve => {
      mzk.model.makeTransitiveSet({
        tracks: [] })
        .then(set => {
          this._dom.play = this._dom.wrapper.getElementsByClassName('play-album')[0];
          this._dom.cover = this._dom.wrapper.getElementsByClassName('label-pp')[0];
          this._dom.title = this._dom.wrapper.getElementsByClassName('artist-title')[0];
          this._dom.artistLabel = this._dom.wrapper.getElementsByClassName('artist-labels')[0];
          this._dom.trackCompo = this._dom.wrapper.getElementsByClassName('artist-track-composition')[0];
          this._dom.country = this._dom.wrapper.getElementsByClassName('artist-country')[0];
          this._dom.genres = this._dom.wrapper.getElementsByClassName('artist-genres')[0];
          this._dom.albumContainer = this._dom.wrapper.getElementsByClassName('sp-artist-albums')[0];
          this._dom.trackContainer = this._dom.wrapper.getElementsByClassName('sp-artist-random-tracks')[0];

          if (response.LABEL.PP !== null && Utils.imageUrlExists(response.LABEL.PP) === true) {
            this._dom.cover.src = response.LABEL.PP;
          }

          this._dom.title.innerHTML = response.LABEL.NAME;
          this._dom.artistLabel.innerHTML = response.LABEL.ALBUM_ARTIST;
          this._dom.trackCompo.innerHTML = `${response.LABEL.TOTAL_RELEASED_ALBUM} ${mzk.lang.playlist.albums} – ${response.LABEL.TOTAL_RELEASED_TRACK} ${mzk.lang.playlist.tracks} – ${response.LABEL.DURATION}`;
          this._dom.country.innerHTML = response.LABEL.COUNTRY;
          this._dom.genres.innerHTML = response.LABEL.GENRES;

          for (let i = 0; i < response.LABEL.ARTISTS.length; ++i) {
            let artist = document.createElement('DIV');
            artist.classList.add('sp-artist-album');

            artist.dataset.id = response.LABEL.ARTISTS[i].ID;

            let albumTitle = document.createElement('P');
            albumTitle.innerHTML = response.LABEL.ARTISTS[i].NAME;

            let albumCover = document.createElement('IMG');
            if (response.LABEL.ARTISTS[i].PP === null) {
              albumCover.src = 'static/img/object/artist.svg';
            } else {
              albumCover.src = response.LABEL.ARTISTS[i].PP;
            }

            artist.addEventListener('click', () => {
              mzk.ui.setSceneView({
                name: 'SingleArtist',
                uiName: response.LABEL.ARTISTS[i].NAME,
                id: response.LABEL.ARTISTS[i].ID
              });
            }, false);

            artist.appendChild(albumTitle);
            artist.appendChild(albumCover);
            this._dom.albumContainer.appendChild(artist);
          }

          for (let i = 0; i < set.length; ++i) {
            let entry = new SingleReleaseArtistViewTrackEntry({
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


export default SingleLabelView;
