import SingleTagView from "../SingleTagView";
import ScrollBar from "../../../../component/bar/ScrollBar";
'use strict';


class SingleCountryView extends SingleTagView {


  constructor(options) {
    super({
      type: 'country'
    });

    this._id = options.id;

    this._dom = {
      flag: null,
      name: null,
      artistContainer: null
    };

    this._init()
      .then(this._processCountry.bind(this))
      .then(this._setupContext.bind(this))
      //.then(this._singleTagEvents.bind(this))
      .then(this._viewReady);
  }


  destroy() {
    super.destroy();
  }


  _processCountry(response) {
    return new Promise(resolve => {

      this._dom.flag = this._dom.wrapper.getElementsByClassName('sp-country-flag')[0];
      this._dom.name = this._dom.wrapper.getElementsByClassName('sp-country-name')[0];
      this._dom.artistContainer = this._dom.wrapper.getElementsByClassName('sp-country-artists')[0];

      this._dom.flag.src = `static/img/flag/${response.COUNTRY_CODE}.svg`;
      this._dom.name.innerHTML = mzk.lang.countries[response.COUNTRY_CODE];

      for (let i = 0; i < response.COUNTRY_ARTISTS.length; ++i) {
        const container = document.createElement('DIV');

        container.classList.add('artist');

        const artistInfo = document.createElement('DIV');
        const artistPp = document.createElement('IMG');
        const artistName = document.createElement('H3');

        artistInfo.classList.add('artist-info');
        artistPp.src = response.COUNTRY_ARTISTS[i].ARTIST_PP;
        artistName.innerHTML = response.COUNTRY_ARTISTS[i].ARTIST_NAME;

        artistInfo.appendChild(artistPp);
        artistInfo.appendChild(artistName);
        container.appendChild(artistInfo);

        const artistAlbums = document.createElement('DIV');
        artistAlbums.classList.add('artist-albums');

        const len = response.COUNTRY_ARTISTS[i].ARTIST_ALBUMS.length > 7 ? 7 : response.COUNTRY_ARTISTS[i].ARTIST_ALBUMS.length;
        for (let j = 0; j < len; ++j) {
          const album = document.createElement('DIV');
          const albumYear = document.createElement('P');
          const albumCover = document.createElement('IMG');
          const albumTitle = document.createElement('P');

          album.classList.add('album');
          album.dataset.id = response.COUNTRY_ARTISTS[i].ARTIST_ALBUMS[j].ALBUM_ID;
          albumYear.innerHTML = response.COUNTRY_ARTISTS[i].ARTIST_ALBUMS[j].ALBUM_YEAR;
          albumCover.src = response.COUNTRY_ARTISTS[i].ARTIST_ALBUMS[j].ALBUM_COVER;
          albumTitle.innerHTML = response.COUNTRY_ARTISTS[i].ARTIST_ALBUMS[j].ALBUM_TITLE;

          album.addEventListener('click', () => {
            mzk.ui.setSceneView({
              name: 'SingleAlbum',
              uiName: response.COUNTRY_ARTISTS[i].ARTIST_ALBUMS[j].ALBUM_TITLE,
              id: response.COUNTRY_ARTISTS[i].ARTIST_ALBUMS[j].ALBUM_ID
            });
          }, false);

          album.appendChild(albumYear);
          album.appendChild(albumCover);
          album.appendChild(albumTitle);
          artistAlbums.appendChild(album);
        }

        container.appendChild(artistAlbums);
        this._dom.artistContainer.appendChild(container);
      }

      new ScrollBar({
        target: this._dom.artistContainer
      });

      resolve();
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default SingleCountryView;
