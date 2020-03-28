import SingleTagView from "../SingleTagView";
'use strict';


class SingleReleaseArtistView extends SingleTagView {


  constructor(options) {
    super({
      type: 'releaseArtist'
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
      .then(this._processArtist.bind(this))
      .then(this._setupContext.bind(this))
      .then(this._singleTagEvents.bind(this))
      .then(this._viewReady);
  }


  _processArtist(response) {
    return new Promise(resolve => {
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

      if (response.ARTIST.ARTIST_PP !== null) {
        this._dom.cover.src = response.ARTIST.ARTIST_PP;
      }

      this._dom.title.innerHTML = response.ARTIST.ARTIST_NAME;
      this._dom.artistLabel.innerHTML = response.ARTIST.ARTIST_NAME;
      this._dom.yearLabel.innerHTML = `<i>${response.ARTIST.ARTIST_ALBUMS[0].ALBUM_YEAR} – ${response.ARTIST.ARTIST_ALBUMS[response.ARTIST.ARTIST_ALBUMS.length -1].ALBUM_YEAR}</i>`;
      this._dom.trackCompo.innerHTML = `${response.ARTIST.ARTIST_ALBUMS.length} ${mzk.lang.playlist.albums} – ${response.ARTIST.NUMBER_TRACKS} ${mzk.lang.playlist.tracks} – ${Utils.secondsToTimecode(response.ARTIST.TOTAL_DURATION)}`;
      this._dom.country.innerHTML = response.ARTIST.COUNTRY;
      this._dom.genres.innerHTML = response.ARTIST.GENRES;

      for (let i = 0; i < response.ARTIST.ARTIST_ALBUMS.length; ++i) {
        const album = document.createElement('DIV');
        album.classList.add('sp-artist-album');
        album.dataset.id = response.ARTIST.ARTIST_ALBUMS[i].ALBUM_ID;

        const albumTitle = document.createElement('P');
        albumTitle.innerHTML = response.ARTIST.ARTIST_ALBUMS[i].ALBUM_NAME;

        const albumCover = document.createElement('IMG');
        albumCover.src = response.ARTIST.ARTIST_ALBUMS[i].ALBUM_PP;

        const albumYear = document.createElement('P');
        albumYear.innerHTML = response.ARTIST.ARTIST_ALBUMS[i].ALBUM_YEAR;

        album.addEventListener('click', () => {
          mzk.ui.setSceneView({
            name: 'SingleAlbum',
            uiName: response.ARTIST.ARTIST_ALBUMS[i].ALBUM_NAME,
            id: response.ARTIST.ARTIST_ALBUMS[i].ALBUM_ID
          });
        }, false);

        album.appendChild(albumYear);
        album.appendChild(albumCover);
        album.appendChild(albumTitle);
        this._dom.albumContainer.appendChild(album);
      }

      resolve();
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default SingleReleaseArtistView;
