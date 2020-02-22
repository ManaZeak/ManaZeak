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

    if (this._groupType === 'ReleaseArtists' || this._groupType === 'Artists') {
      this._dom.container.dataset.id = this._entry.ARTIST_ID;
      this._dom.name.innerHTML = this._entry.ARTIST_NAME;

      if (this._entry.ARTIST_PP !== null) {
        this._dom.img.src = this._entry.ARTIST_PP;
      } else {
        this._dom.img.src = 'static/img/object/artist.svg';
      }
    } else if (this._groupType === 'Albums') {
      this._dom.container.dataset.id = this._entry.ALBUM_ID;
      this._dom.name.innerHTML = this._entry.ALBUM_TITLE;

      if (this._entry.ALBUM_COVER !== null) {
        this._dom.img.src = this._entry.ALBUM_COVER;
      } else {
        this._dom.img.src = 'static/img/object/album.svg';
      }
    } else if (this._groupType === 'Labels') {
      this._dom.container.dataset.id = this._entry.LABEL_ID;
      this._dom.name.innerHTML = this._entry.LABEL_NAME;

      if (this._entry.LABEL_PP !== null) {
        this._dom.img.src = this._entry.LABEL_PP;
      } else {
        this._dom.img.src = 'static/img/object/label.svg';
      }
    } else if (this._groupType === 'Genres') {
      this._dom.container.dataset.id = this._entry.GENRE_ID;
      this._dom.name.innerHTML = this._entry.GENRE_NAME;
      if (this._entry.GENRE_LOGO !== null) {
        this._dom.img.src = this._entry.GENRE_LOGO;
      } else {
        this._dom.img.src = 'static/img/object/genre.svg';
      }
    } else if (this._groupType === 'Countries') {
      this._dom.container.dataset.id = this._entry.COUNTRY_ID;
      this._dom.name.innerHTML = mzk.lang.countries[this._entry.COUNTRY_CODE];
      if (this._entry.COUNTRY_FLAG !== null) {
        this._dom.img.src = this._entry.COUNTRY_FLAG;
      } else {
        this._dom.img.src = 'static/img/object/flag.svg';
      }
    }

    this._dom.container.appendChild(this._dom.img);
    this._dom.container.appendChild(this._dom.name);
  }


  _events() {
    if (this._groupType === 'ReleaseArtists') {
      this._dom.container.addEventListener('click', () => {
        mzk.ui.setSceneView({
          name: 'SingleReleaseArtist',
          uiName: this._entry.ARTIST_NAME,
          id: this._entry.ARTIST_ID
        });
      }, false);
    } else if (this._groupType === 'Artists') {
      this._dom.container.addEventListener('click', () => {
        mzk.ui.setSceneView({
          name: 'SingleArtist',
          uiName: this._entry.ARTIST_NAME,
          id: this._entry.ARTIST_ID
        });
      }, false);
    } else if (this._groupType === 'Albums') {
      this._dom.container.addEventListener('click', () => {
        mzk.ui.setSceneView({
          name: 'SingleAlbum',
          uiName: this._entry.ALBUM_TITLE,
          id: this._entry.ALBUM_ID
        });
      }, false);
    } else if (this._groupType === 'Producers') {
      this._dom.container.addEventListener('click', () => {
        mzk.ui.setSceneView({
          name: 'SingleProducer',
          uiName: this._entry.PRODUCER_NAME,
          id: this._entry.PRODUCER_ID
        });
      }, false);
    } else if (this._groupType === 'Labels') {
      this._dom.container.addEventListener('click', () => {
        mzk.ui.setSceneView({
          name: 'SingleLabel',
          uiName: this._entry.LABEL_NAME,
          id: this._entry.LABEL_ID
        });
      }, false);
    } else if (this._groupType === 'Genres') {
      this._dom.container.addEventListener('click', () => {
        mzk.ui.setSceneView({
          name: 'SingleGenre',
          uiName: this._entry.GENRE_NAME,
          id: this._entry.GENRE_ID
        });
      }, false);
    } else if (this._groupType === 'Countries') {
      this._dom.container.addEventListener('click', () => {
        mzk.ui.setSceneView({
          name: 'SingleCountry',
          uiName: this._entry.COUNTRY_CODE,
          id: this._entry.COUNTRY_ID
        });
      }, false);
    }
  }


  get dom() {
    return this._dom.container;
  }


}

export default SuggestionEntry;
