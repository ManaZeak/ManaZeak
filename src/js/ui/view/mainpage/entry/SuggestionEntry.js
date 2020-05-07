class SuggestionEntry {


  constructor(options) {
    this._entry = options.entry;
    this._groupType = options.type;

    this._dom = {
      container: null,
      img: null,
      name: null
    };

    this._setSingleArtist = this._setSingleArtist.bind(this);
    this._setSingleAlbum = this._setSingleAlbum.bind(this);
    this._setProducer = this._setProducer.bind(this);
    this._setLabel = this._setLabel.bind(this);
    this._setGenre = this._setGenre.bind(this);
    this._setCountry = this._setCountry.bind(this);

    this._init();
    this._addEvents();
  }


  destroy() {
    this._removeEvents();
    Utils.removeAllObjectKeys(this);
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
      const image = this._dom.img;
      this._dom.img = document.createElement('DIV');
      this._dom.img.classList.add('country-flag-wrapper');
      this._dom.container.dataset.id = this._entry.COUNTRY_ID;
      this._dom.container.classList.add('country');
      this._dom.name.innerHTML = mzk.lang.countries[this._entry.COUNTRY_CODE];
      if (this._entry.COUNTRY_FLAG !== null) {
        image.src = this._entry.COUNTRY_FLAG;
      } else {
        image.src = 'static/img/object/flag.svg';
      }

      this._dom.img.appendChild(image);
    }

    this._dom.container.appendChild(this._dom.img);
    this._dom.container.appendChild(this._dom.name);
  }


  _addEvents() {
    if (this._groupType === 'ReleaseArtists' || this._groupType === 'Artists') {
      this._dom.container.addEventListener('click', this._setSingleArtist, false);
    } else if (this._groupType === 'Albums') {
      this._dom.container.addEventListener('click', this._setSingleAlbum, false);
    } else if (this._groupType === 'Producers') {
      this._dom.container.addEventListener('click', this._setProducer, false);
    } else if (this._groupType === 'Labels') {
      this._dom.container.addEventListener('click', this._setLabel, false);
    } else if (this._groupType === 'Genres') {
      this._dom.container.addEventListener('click', this._setGenre, false);
    } else if (this._groupType === 'Countries') {
      this._dom.container.addEventListener('click', this._setCountry, false);
    }
  }


  _removeEvents() {
    if (this._groupType === 'ReleaseArtists' || this._groupType === 'Artists') {
      this._dom.container.removeEventListener('click', this._setSingleArtist, false);
    } else if (this._groupType === 'Albums') {
      this._dom.container.removeEventListener('click', this._setSingleAlbum, false);
    } else if (this._groupType === 'Producers') {
      this._dom.container.removeEventListener('click', this._setProducer, false);
    } else if (this._groupType === 'Labels') {
      this._dom.container.removeEventListener('click', this._setLabel, false);
    } else if (this._groupType === 'Genres') {
      this._dom.container.removeEventListener('click', this._setGenre, false);
    } else if (this._groupType === 'Countries') {
      this._dom.container.removeEventListener('click', this._setCountry, false);
    }
  }


  _setSingleArtist() {
    mzk.ui.setSceneView({
      name: 'SingleArtist',
      uiName: this._entry.ARTIST_NAME,
      id: this._entry.ARTIST_ID
    });
  }


  _setSingleAlbum() {
    mzk.ui.setSceneView({
      name: 'SingleAlbum',
      uiName: this._entry.ALBUM_TITLE,
      id: this._entry.ALBUM_ID
    });
  }


  _setProducer() {
    mzk.ui.setSceneView({
      name: 'SingleProducer',
      uiName: this._entry.PRODUCER_NAME,
      id: this._entry.PRODUCER_ID
    });
  }


  _setLabel() {
    mzk.ui.setSceneView({
      name: 'SingleLabel',
      uiName: this._entry.LABEL_NAME,
      id: this._entry.LABEL_ID
    });
  }


  _setGenre() {
    mzk.ui.setSceneView({
      name: 'SingleGenre',
      uiName: this._entry.GENRE_NAME,
      id: this._entry.GENRE_ID
    });
  }


  _setCountry() {
    mzk.ui.setSceneView({
      name: 'SingleCountry',
      uiName: this._entry.COUNTRY_CODE,
      id: this._entry.COUNTRY_ID
    });
  }


  get dom() {
    return this._dom.container;
  }


}

export default SuggestionEntry;
