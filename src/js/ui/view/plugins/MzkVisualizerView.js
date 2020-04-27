import SceneView from "../SceneView";


class MzkVisualizerView extends SceneView {


  constructor(options) {
    super(options);

    this._dom = {
      wrapper: null,
      home: null,
      flag: null
    };

    this._fetchWrapper()
      .then(this._events.bind(this))
      .then(this._viewReady);
  }


  destroy() {
    super.destroy();
    Utils.removeAllObjectKeys(this);
  }


  _fetchWrapper() {
    return new Promise(resolve => {
      mzk.komunikator.getTemplate('view/mzkvisualizer/layout/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');
          this._dom.wrapper = doc.getElementsByClassName('mzkvisualizer-view-wrapper')[0];
          this._dom.home = doc.getElementsByClassName('mzkvisualizer-controls-home')[0];

          if (window.MzkVisualizer) {
            console.log('fire !');
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


  _countryClicked(info) {
    this._dom.flag.src = `static/img/flag/${info.trigram}.svg`;
    console.log(info)
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default MzkVisualizerView;
