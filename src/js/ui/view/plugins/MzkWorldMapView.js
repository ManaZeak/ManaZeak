import SceneView from "../SceneView";

class MzkWorldMapView extends SceneView {


  constructor(options) {
    super(options);

    this._dom = {
      wrapper: null
    };

    this._fetchWrapper()
      .then(this._events.bind(this))
      .then(this._viewReady);
  }


  destroy() {
    super.destroy();
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

          if (window.MzkWorldMap) {
            this._mzkWorldMap = new MzkWorldMap({
              assetsUrl: '/static/plugins/MzkWorldMap/',
              renderTo: this._dom.wrapper,
              centerOn: 'FRA' // TODO why not get this from user on signup ?
            });
          }

          resolve();
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


  get dom() {
    return this._dom.wrapper;
  }


}


export default MzkWorldMapView;
