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
    this._dom.container = document.createElement('LI');
    this._dom.img = document.createElement('IMG');
    this._dom.title = document.createElement('P');
    this._dom.desc = document.createElement('P');
    this._dom.title = document.createElement('P');

    this._dom.title.classList.add('mp-collection-title');

    if (this._type === 'PartyView') {
      this._dom.img.src = 'static/img/actions/party.svg';
      this._dom.title.innerHTML = mzk.lang.mainpage.discover.pv.title;
      this._dom.desc.innerHTML = mzk.lang.mainpage.discover.pv.desc;
    }

    this._dom.container.appendChild(this._dom.img);
    this._dom.container.appendChild(this._dom.title);
    this._dom.container.appendChild(this._dom.desc);
  }


  _events() {
    this._dom.container.addEventListener('click', () => {
      mzk.ui.setSceneView({
        name: 'Party'
      });
    }, false);
  }


  get dom() {
    return this._dom.container;
  }


}


export default DiscoverEntry;
