import SingleTagView from "../SingleTagView";
'use strict';


class SingleArtistView extends SingleTagView {


  constructor(options) {
    super({
      type: 'artist'
    });

    this._id = options.id;

    this._dom = {
      pp: null,
      title: null,
      trackCompo: null,
      country: null,
      albumContainer: null
    };

    this._init()
      .then(this._processArtist.bind(this))
      .then(this._setupContext.bind(this))
      .then(this._viewReady);
  }


  _processArtist(response) {
    return new Promise(resolve => {
      this._dom.pp = this._dom.wrapper.getElementsByClassName('sa-artist-pp')[0];
      this._dom.title = this._dom.wrapper.getElementsByClassName('sa-artist-name')[0];
      this._dom.yearLabel = this._dom.wrapper.getElementsByClassName('sa-active-year')[0];
      this._dom.trackCompo = this._dom.wrapper.getElementsByClassName('sa-composition')[0];
      this._dom.country = this._dom.wrapper.getElementsByClassName('sa-artist-countries')[0];
      this._dom.genres = this._dom.wrapper.getElementsByClassName('sa-artist-genres')[0];
      this._dom.albumContainer = this._dom.wrapper.getElementsByClassName('sa-right')[0];

      if (response.ARTIST.ARTIST_PP !== null) {
        this._dom.pp.src = response.ARTIST.ARTIST_PP;
      }

      this._dom.title.innerHTML = response.ARTIST.ARTIST_NAME;
      this._dom.yearLabel.innerHTML = `<i>${response.ARTIST.ARTIST_ALBUMS[0].ALBUM_YEAR} – ${response.ARTIST.ARTIST_ALBUMS[response.ARTIST.ARTIST_ALBUMS.length -1].ALBUM_YEAR}</i>`;
      this._dom.trackCompo.innerHTML = `${response.ARTIST.ARTIST_ALBUMS.length} ${mzk.lang.playlist.albums} – ${response.ARTIST.NUMBER_TRACKS} ${mzk.lang.playlist.tracks} – ${Utils.secondsToTimecode(response.ARTIST.TOTAL_DURATION)}`;

      for (let i = 0; i < response.ARTIST.ARTIST_COUNTRIES.length; ++i) {
        const link = document.createElement('A');
        const flag = document.createElement('IMG');
        link.dataset.id = response.ARTIST.ARTIST_COUNTRIES[i].ID;
        flag.src = `static/img/flag/${response.ARTIST.ARTIST_COUNTRIES[i].CODE}.svg`;
        link.addEventListener('click', function() {
          mzk.ui.setSceneView({
            name: 'SingleCountry',
            uiName: response.ARTIST.ARTIST_COUNTRIES[i].CODE,
            id: this.dataset.id
          });
        }.bind(link), false);
        link.appendChild(flag);
        this._dom.country.appendChild(link);
      }

      for (let i = 0; i < response.ARTIST.ARTIST_GENRES.length; ++i) {
        const link = document.createElement('A');
        link.innerHTML = response.ARTIST.ARTIST_GENRES[i].NAME;
        link.dataset.id = response.ARTIST.ARTIST_GENRES[i].ID;
        link.addEventListener('click', function() {
          mzk.ui.setSceneView({
            name: 'SingleGenre',
            uiName: this.innerHTML,
            id: this.dataset.id
          });
        }.bind(link), false);
        this._dom.genres.appendChild(link);
      }

      const releasedAlbums = document.createElement('DIV');
      releasedAlbums.classList.add('sa-artist-albums');

      for (let i = response.ARTIST.ARTIST_ALBUMS.length - 1; i >= 0; --i) {
        const album = document.createElement('DIV');
        album.classList.add('sa-album');
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
        releasedAlbums.appendChild(album);
      }

      const sectionTitle = document.createElement('H3');
      sectionTitle.innerHTML = 'Released album';
      this._dom.albumContainer.appendChild(sectionTitle);
      this._dom.albumContainer.appendChild(releasedAlbums);

      resolve();
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default SingleArtistView;
