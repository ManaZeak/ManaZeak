import SceneView from "../SceneView";
import ScrollBar from "../../utils/ScrollBar";


class PartyView extends SceneView {


  constructor(options) {
    super(options);

    this._dom = {
      container: null,
      tracklistContainer: null,
      home: null
    };

    this._fetchWrapper()
      .then(this._events.bind(this))
      .then(this._partyViewReady);
  }


  _fetchWrapper() {
    return new Promise(resolve => {
      mzk.komunikator.getTemplate('view/party/layout/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');

          this._dom.container = doc.getElementsByClassName('party-view-wrapper')[0];
          this._dom.tracklistContainer = doc.getElementsByClassName('pv-current-album')[0].children[1];
          this._dom.home = doc.getElementsByClassName('pv-controls-home')[0];

          /*          new ScrollBar({
            target: this._dom.tracklistContainer
          });
          this._dom.tracklistContainer = this._dom.tracklistContainer.firstElementChild.firstElementChild;
*/
          resolve();
        });
    });
  }


  _events() {
    return new Promise(resolve => {
      this._dom.home.addEventListener('click', mzk.ui.setSceneView.bind(mzk.ui, { name: 'MainPage' }), false);
      resolve();
    });
  }


  _partyViewReady() {
    Events.fire('SceneViewReady');
  }


  get dom() {
    return this._dom.container;
  }


}


export default PartyView;
