class SuggestionEntry {


  constructor(options) {
    this._entry = options.entry;
    this._groupType = options.type;

    this._dom = {
      container: null,
      img: null,
      name: null
    };

    this._init();
    this._events();
  }


  _init() {
    this._dom.container = document.createElement('DIV');
    this._dom.img = document.createElement('IMG');
    this._dom.name = document.createElement('P');

    this._dom.container.classList.add('mp-suggestion-item');

    if (this._groupType === 'Artists') {
      this._dom.container.dataset.id = this._entry.ARTIST_ID;
      this._dom.name.innerHTML = this._entry.ARTIST_NAME;

      if (this._entry.ARTIST_PP !== null) {
        this._dom.img.src = this._entry.ARTIST_PP;
      } else {
        this._dom.img.src = 'static/img/tag/artist.svg';
      }
    } else if (this._groupType === 'Albums') {
      this._dom.container.dataset.id = this._entry.ALBUM_ID;
      this._dom.name.innerHTML = this._entry.ALBUM_TITLE;

      if (this._entry.ALBUM_COVER !== null) {
        this._dom.img.src = this._entry.ALBUM_COVER;
      } else {
        this._dom.img.src = 'static/img/tag/album.svg';
      }
    } else if (this._groupType === 'Genres') {
      this._dom.container.dataset.id = this._entry.GENRE_ID;
      this._dom.name.innerHTML = this._entry.GENRE_NAME;
      if (this._entry.GENRE_LOGO !== null) {
        this._dom.img.src = this._entry.GENRE_LOGO;
      } else {
        this._dom.img.src = 'static/img/tag/genre.svg';
      }
    }

    this._dom.container.appendChild(this._dom.img);
    this._dom.container.appendChild(this._dom.name);
  }


  _events() {
    if (this._groupType === 'Artists') {
      this._dom.container.addEventListener('click', () => {
        mzk.ui.setSceneView({
          name: 'SingleArtist',
          artist: {
            id: this._entry.ARTIST_ID,
            name: this._entry.ARTIST_NAME,
            pp: this._entry.ARTIST_PP
          }
        });
      }, false);
    } else if (this._groupType === 'Albums') {
      this._dom.container.addEventListener('click', () => {
        mzk.ui.setSceneView({
          name: 'SingleAlbum',
          album: {
            id: this._entry.ALBUM_ID,
            title: this._entry.ALBUM_TITLE,
            cover: this._entry.ALBUM_COVER
          }
        });
      }, false);
    } else if (this._groupType === 'Genres') {
      this._dom.container.addEventListener('click', () => {
        mzk.ui.setSceneView({
          name: 'SingleGenre',
          genre: {
            id: this._entry.GENRE_ID,
            name: this._entry.GENRE_NAME,
            img: this._entry.GENRE_IMAGE
          }
        });
      }, false);
    }
  }


  get dom() {
    return this._dom.container;
  }


}

export default SuggestionEntry;
