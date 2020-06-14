import SceneView from "../SceneView";


class MzkWorldMapView extends SceneView {


  constructor(options) {
    super(options);

    this._dom = {
      wrapper: null,
      home: null,
      flag: null
    };

    this._opacityTimeoutId = -1;

    this._fetchWrapper()
      .then(this._events.bind(this))
      .then(this._viewReady);
  }


  destroy() {
    super.destroy();
    clearInterval(this._opacityTimeoutId);
    this._mzkWorldMap.destroy();
    Utils.removeAllObjectKeys(this);
  }


  _fetchWrapper() {
    return new Promise(resolve => {
      mzk.komunikator.getTemplate('view/mzkworldmap/layout/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');
          this._dom.wrapper = doc.getElementsByClassName('mzkworldmap-view-wrapper')[0];
          this._dom.home = doc.getElementsByClassName('mzkworldmap-controls-home')[0];
          this._dom.flagContainer = doc.getElementsByClassName('mzkworldmap-country-flag-container')[0];
          this._dom.flag = doc.getElementById('mzkworldmap-country-flag');

          if (window.MzkWorldMap) {
            this._mzkWorldMap = new MzkWorldMap({
              assetsUrl: '/static/plugins/MzkWorldMap/',
              renderTo: this._dom.wrapper,
              countryClicked: this._countryClicked.bind(this),
              centerOn: 'FRA' // TODO why not get this from user on signup ? Like fav country or else
            });

            this._dom.flagContainer.style.opacity = 1;
            this._dom.flag.src = 'static/img/flag/FRA.svg';

            resolve();
          } else {
            reject('MzkWorldMap plugin not installed on this instance of ManaZeak');
          }
        });
    });
  }


  _events() {
    return new Promise(resolve => {
      this._dom.home.addEventListener('click', () => {
        mzk.ui.setSceneView({ name: 'MainPage' });
      }, false);

      resolve();
    });
  }


  _countryClicked(info) {
    console.log(info);
    if (info.unselect === true) {
      this._dom.flagContainer.style.opacity = 0;
      this._opacityTimeoutId = setTimeout(() => { this._dom.flag.src = `static/img/default/location.svg`; }, 200); // 200ms to match mzk duration
    } else {
      this._dom.flagContainer.style.opacity = 1;
      this._dom.flag.src = `static/img/flag/${info.trigram}.svg`;
    }
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default MzkWorldMapView;
