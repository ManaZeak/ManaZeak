import SceneView from "../SceneView";
import ScrollBar from "../../utils/ScrollBar";


class PartyView extends SceneView {


  constructor(options) {
    super(options);

    this._dom = {
      container: null,
      tracklistContainer: null
    };

    this._fetchWrapper()
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

          console.log(this._dom)
/*          new ScrollBar({
            target: this._dom.tracklistContainer
          });
          this._dom.tracklistContainer = this._dom.tracklistContainer.firstElementChild.firstElementChild;
*/
          resolve();
        });
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
