class SuggestionEntry {


  constructor(options) {
    this._entry = options.entry;
    this._type = options.type;

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

    if (this._type === 'artist') {
      this._dom.container.dataset.id = this._entry.ARTIST_ID;
    } else if (this._type === 'album') {
      this._dom.container.dataset.id = this._entry.ALBUM_ID;
    } else if (this._type === 'genre') {
      this._dom.container.dataset.id = this._entry.GENRE_ID;
    }

    this._dom.img.src = this._entry.ARTIST_PP || 'static/img/tag/artist.svg';
    this._dom.name.innerHTML = this._entry.ARTIST_NAME; // TODO adapt to alb and genre

    this._dom.container.appendChild(this._dom.img);
    this._dom.container.appendChild(this._dom.name);
  }


  _events() {
    this._dom.container.addEventListener('click', () => {
      // TODO : wait for backend to offer get (depends on this type)
    }, false);
  }


  get dom() {
    return this._dom.container;
  }


}

export default SuggestionEntry;
