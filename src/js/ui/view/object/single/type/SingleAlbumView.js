import SingleTagView from "../SingleTagView";
import ScrollBar from "../../../../component/bar/ScrollBar";
import SingleAlbumViewTrackEntry from "../entry/SingleAlbumViewTrackEntry";
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
      .then(this._processAlbum.bind(this))
      .then(this._setupContext.bind(this))
      .then(this._singleTagEvents.bind(this))
      .then(this._viewReady);
  }


  _processAlbum(response) {
    return new Promise(resolve => {
      mzk.model.makeTransitiveSet({
        tracks: response.ALBUM.TRACKS,
        albumArtist: response.ALBUM.ALBUM_ARTIST,
        album: response.ALBUM.NAME })
        .then(set => {
          this._dom.play = this._dom.wrapper.getElementsByClassName('play-album')[0];
          this._dom.cover = this._dom.wrapper.getElementsByClassName('album-cover')[0];
          this._dom.title = this._dom.wrapper.getElementsByClassName('album-title')[0];
          this._dom.albumArtist = this._dom.wrapper.getElementsByClassName('album-artist')[0];
          this._dom.yearLabel = this._dom.wrapper.getElementsByClassName('album-year-label')[0];
          this._dom.trackCompo = this._dom.wrapper.getElementsByClassName('album-track-composition')[0];
          this._dom.country = this._dom.wrapper.getElementsByClassName('album-country')[0];
          this._dom.genres = this._dom.wrapper.getElementsByClassName('album-genres')[0];
          this._dom.trackContainer = this._dom.wrapper.getElementsByClassName('album-tracks')[0];

          this._dom.cover.src = this._cover;
          this._dom.title.innerHTML = this._title;
          this._dom.albumArtist.innerHTML = response.ALBUM.ALBUM_ARTIST.NAME;
          this._dom.yearLabel.innerHTML = `<i>${response.ALBUM.YEAR} – ${response.ALBUM.LABEL.NAME || 'Not on label'}</i>`;
          this._dom.trackCompo.innerHTML = `${response.ALBUM.TRACKS.length} ${mzk.lang.playlist.tracks} – ${Utils.secondsToTimecode(response.ALBUM.DURATION)}`;

          this._dom.country.innerHTML = response.ALBUM.COUNTRY.length > 0 ? '' : 'No country';
          for (let i = 0; i < response.ALBUM.COUNTRY.length; ++i) {
            if (i + 1 === response.ALBUM.COUNTRY.length) {
              this._dom.country.innerHTML = response.ALBUM.COUNTRY[i];
            } else {
              this._dom.country.innerHTML += `${response.ALBUM.COUNTRY[i]}, `;
            }
          }

          this._dom.genres.innerHTML = '';
          for (let i = 0; i < response.ALBUM.GENRES.length; ++i) {
            if (i + 1 === response.ALBUM.GENRES.length) {
              this._dom.genres.innerHTML += response.ALBUM.GENRES[i].NAME;
            } else {
              this._dom.genres.innerHTML += `${response.ALBUM.GENRES[i].NAME}, `;
            }
          }

          for (let i = 0; i < set.length; ++i) {
            let entry = new SingleAlbumViewTrackEntry({
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


export default SingleAlbumView;
