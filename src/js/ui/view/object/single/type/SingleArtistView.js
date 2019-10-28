import SingleTagView from "../SingleTagView";
import SingleArtistViewTrackEntry from "../entry/SingleArtistViewTrackEntry";
import ScrollBar from "../../../../component/bar/ScrollBar";
'use strict';


class SingleArtistView extends SingleTagView {


  constructor(options) {
    super({
      type: 'artist'
    });

    this._id = options.id;
    this._name = options.name;
    this._pp = options.pp;

    this._dom = {
      cover: null,
      title: null,
      trackCompo: null,
      artistLabel: null,
      country: null,
      play: null,
      albumContainer: null,
      tracksContainer: null
    };

    this._init()
      .then(this._processArtist.bind(this))
      .then(this._singleArtistEvents.bind(this))
      .then(this._viewReady);
  }


  _processArtist(response) {
    return new Promise(resolve => {
      mzk.model.makeTransitiveSet({
        tracks: response.RANDOM_TRACKS })
        .then(set => {
          this._dom.play = this._dom.wrapper.getElementsByClassName('play-album')[0];
          this._dom.cover = this._dom.wrapper.getElementsByClassName('artist-pp')[0];
          this._dom.title = this._dom.wrapper.getElementsByClassName('artist-title')[0];
          this._dom.artistLabel = this._dom.wrapper.getElementsByClassName('artist-labels')[0];
          this._dom.yearLabel = this._dom.wrapper.getElementsByClassName('artist-years')[0];
          this._dom.trackCompo = this._dom.wrapper.getElementsByClassName('artist-track-composition')[0];
          this._dom.country = this._dom.wrapper.getElementsByClassName('artist-country')[0];
          this._dom.genres = this._dom.wrapper.getElementsByClassName('artist-genres')[0];
          this._dom.albumContainer = this._dom.wrapper.getElementsByClassName('sp-artist-albums')[0];
          this._dom.trackContainer = this._dom.wrapper.getElementsByClassName('sp-artist-random-tracks')[0];

          this._dom.cover.src = this._pp;
          this._dom.title.innerHTML = this._name;
          this._dom.artistLabel.innerHTML = response.ARTIST.ALBUM_ARTIST;
          this._dom.yearLabel.innerHTML = `<i>${response.ARTIST.ALBUMS[0].YEAR} – ${response.ARTIST.ALBUMS[response.ARTIST.ALBUMS.length -1].YEAR}</i>`;
          this._dom.trackCompo.innerHTML = `${response.ARTIST.ALBUMS.length} ${mzk.lang.playlist.albums} – ${response.ARTIST.TOTAL_TRACKS} ${mzk.lang.playlist.tracks} – ${response.ARTIST.DURATION}`;
          this._dom.country.innerHTML = response.ARTIST.COUNTRY;
          this._dom.genres.innerHTML = response.ARTIST.GENRES;

          for (let i = 0; i < response.ARTIST.ALBUMS.length; ++i) {
            let album = document.createElement('DIV');
            album.classList.add('sp-artist-album');

            album.dataset.id = response.ARTIST.ALBUMS[i].ID;

            let albumTitle = document.createElement('P');
            albumTitle.innerHTML = response.ARTIST.ALBUMS[i].NAME;

            let albumCover = document.createElement('IMG');
            albumCover.src = 'static/img/object/album.svg';

            let albumYear = document.createElement('P');
            albumYear.innerHTML = response.ARTIST.ALBUMS[i].YEAR;

            album.addEventListener('click', () => {
              mzk.ui.setSceneView({
                name: 'SingleAlbum',
                album: {
                  id: response.ARTIST.ALBUMS[i].ID,
                  title: response.ARTIST.ALBUMS[i].NAME,
                  cover: response.ARTIST.ALBUMS[i].COVER
                }
              });
            }, false);

            album.appendChild(albumTitle);
            album.appendChild(albumCover);
            album.appendChild(albumYear);
            this._dom.albumContainer.appendChild(album);
          }

          for (let i = 0; i < set.length; ++i) {
            let entry = new SingleArtistViewTrackEntry({
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


  _singleArtistEvents() {
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


export default SingleArtistView;
