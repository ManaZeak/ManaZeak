class CollectionEntry {


  constructor(options) {
    this._entry = options.entry;
    this._callback = options.callback;

    this._dom = {
      container: null,
      img: null,
      title: null,
      stats: null
    };

    this._init();
    this._events();
  }


  _init() {
    this._dom.container = document.createElement('LI');
    this._dom.image = document.createElement('IMG');
    this._dom.title = document.createElement('P');
    this._dom.stats = document.createElement('P');

    this._dom.container.dataset.id = this._entry.ID;
    this._dom.image.src = this._entry.IMG || 'static/img/logo/manazeak-logo-square.svg';
    this._dom.title.innerHTML = this._entry.NAME;
    this._dom.title.classList.add('mp-collection-title');
    this._dom.stats.innerHTML = this._entry.DESC;

    this._dom.container.appendChild(this._dom.image);
    this._dom.container.appendChild(this._dom.title);
    this._dom.container.appendChild(this._dom.stats);
  }


  _events() {
    this._dom.container.addEventListener('click', () => {
      this._callback(this._dom.container.dataset.id);
    }, false);
  }


  get dom() {
    return this._dom.container;
  }


}

export default CollectionEntry;
