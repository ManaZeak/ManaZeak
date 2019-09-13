class CollectionEntry {


  constructor(options) {
    this._entry = options.entry;

    this._dom = {
      container: null,
      img: null,
      title: null,
      stats: null,
      duration: null
    };

    this._init();
    this._events();
  }


  _init() {
    this._dom.container = document.createElement('LI');
    this._dom.image = document.createElement('IMG');
    this._dom.title = document.createElement('P');
    this._dom.stats = document.createElement('P');
    this._dom.duration = document.createElement('P');

    this._dom.container.dataset.id = this._entry.ID;
    this._dom.image.src = this._entry.IMG || 'static/img/logo/manazeak-logo-square.svg';
    this._dom.title.innerHTML = this._entry.NAME;
    this._dom.title.classList.add('mp-collection-title');
    //this._dom.stats.innerHTML = `${this._entry.stats.tracks} tracks, ${this._entry.stats.albums} albums, ${this._entry.stats.artists} artists`;
    this._dom.stats.innerHTML = `${this._entry.TOTAL_TRACK} tracks`;
    this._dom.duration.innerHTML = Utils.secondsToTimecode(this._entry.TOTAL_DURATION);

    this._dom.container.appendChild(this._dom.image);
    this._dom.container.appendChild(this._dom.title);
    this._dom.container.appendChild(this._dom.stats);
    this._dom.container.appendChild(this._dom.duration);
  }


  _events() {
    this._dom.container.addEventListener('click', () => {
      mzk.ui.setSceneView({ playlist: mzk.model.collection.getPlaylistFromId(parseInt(this._dom.container.dataset.id)) });
    }, false);
  }


  get dom() {
    return this._dom.container;
  }


}

export default CollectionEntry;
