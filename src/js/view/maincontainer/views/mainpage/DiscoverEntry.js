class DiscoverEntry {


  constructor(options) {
    this._type = options.type;

    this._dom = {
      container: null,
      img: null,
      title: null
    };

    this._init();
    this._events();
  }


  _init() {
    this._dom.container = document.createElement('DIV');
    this._dom.img = document.createElement('IMG');
    this._dom.title = document.createElement('H2');

    this._dom.container.classList.add('mp-discover-item');
    if (this._type === 'PartyView') {
      this._dom.img.src = 'static/img/actions/party.svg';
      this._dom.title.innerHTML = this._type; // TODO handle nls here from type value
    }

    this._dom.container.appendChild(this._dom.img);
    this._dom.container.appendChild(this._dom.title);
  }


  _events() {
    this._dom.container.addEventListener('click', () => {
      mzk.ui.setSceneView({
        name: 'Party'
      })
    }, false);
  }


  get dom() {
    return this._dom.container;
  }


}


export default DiscoverEntry;