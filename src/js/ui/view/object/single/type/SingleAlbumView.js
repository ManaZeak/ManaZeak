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

          this._dom.cover.src = response.ALBUM.COVER;
          this._dom.title.innerHTML = response.ALBUM.NAME;

          const link = document.createElement('A');
          link.innerHTML = response.ALBUM.ALBUM_ARTIST.NAME;
          link.dataset.id = response.ALBUM.ALBUM_ARTIST.ID;
          link.addEventListener('click', function() {
            mzk.ui.setSceneView({
              name: 'SingleArtist',
              uiName: this.innerHTML,
              id: this.dataset.id
            });
          }.bind(link), false);
          this._dom.albumArtist.appendChild(link);

          const label = document.createElement('SPAN');
          label.dataset.id = response.ALBUM.LABEL.ID;
          label.innerHTML = response.ALBUM.LABEL.NAME;

          if (response.ALBUM.LABEL.NAME === response.ALBUM.ALBUM_ARTIST.NAME) {
            label.innerHTML = mzk.lang.tags.Selfreleased;
          }

          label.addEventListener('click', () => {
            mzk.ui.setSceneView({
              name: 'SingleLabel',
              uiName: response.ALBUM.LABEL.NAME,
              id: response.ALBUM.LABEL.ID
            });
          }, false);

          this._dom.yearLabel.innerHTML = `<i>${response.ALBUM.YEAR} – </i>`;
          this._dom.yearLabel.appendChild(label);
          this._dom.trackCompo.innerHTML = `${response.ALBUM.TRACKS.length} ${mzk.lang.playlist.tracks} – ${Utils.secondsToTimecode(response.ALBUM.DURATION)}`;

          this._dom.country.innerHTML = 'No country';
          if (response.ALBUM.COUNTRY.length > 0) {
            this._dom.country.innerHTML =  '';
          }

          for (let i = 0; i < response.ALBUM.COUNTRY.length; ++i) {
            const flag = document.createElement('IMG');
            flag.dataset.id = response.ALBUM.COUNTRY[i].ID;
            flag.src = `static/img/flag/${response.ALBUM.COUNTRY[i].CODE}.svg`;
            flag.addEventListener('click', () => {
              mzk.ui.setSceneView({
                name: 'SingleCountry',
                uiName: response.ALBUM.COUNTRY[i].CODE,
                id: response.ALBUM.COUNTRY[i].ID
              });
            }, false);
            this._dom.country.appendChild(flag);
          }

          this._dom.genres.innerHTML = '';
          for (let i = 0; i < response.ALBUM.GENRES.length; ++i) {
            const genreLink = document.createElement('A');
            genreLink.innerHTML = response.ALBUM.GENRES[i].NAME;
            genreLink.dataset.id = response.ALBUM.GENRES[i].ID;
            genreLink.addEventListener('click', function() {
              mzk.ui.setSceneView({
                name: 'SingleGenre',
                uiName: this.innerHTML,
                id: this.dataset.id
              });
            }.bind(genreLink), false);
            this._dom.genres.appendChild(genreLink);
          }

          for (let i = 0; i < set.length; ++i) {
            const entry = new SingleAlbumViewTrackEntry({
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
