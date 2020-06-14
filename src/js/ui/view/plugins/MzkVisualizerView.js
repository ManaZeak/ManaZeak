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

          if (window.MzkVisualizer) {
            const waveformProgress = new MzkVisualizer({
              type: 'frequencycircle',
              player: mzk.model.player.player,
              renderTo: this._dom.wrapper,
              fftSize: 512,
              image: 'static/plugins/MzkVisualizer/img/manazeak-logo-small.svg'
            });
          }

          resolve();
        });
    });
  }


  _events() {
    return new Promise(resolve => {
      resolve();
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default MzkVisualizerView;
