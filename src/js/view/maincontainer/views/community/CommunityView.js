import SceneView from "../../SceneView";
'use strict';


class CommunityView extends SceneView {
  constructor() {
    super();

    this._dom = {
      wrapper: null
    };

    this._fetchWrapper()
      .then(this._viewReady);
  }


  _fetchWrapper() {
    return new Promise(resolve => {
      mzk.komunikator.getTemplate('view/community/layout/')
        .then(response => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');

          this._dom.wrapper = doc.getElementsByClassName('community-view-wrapper')[0];

          resolve();
        });
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default CommunityView;
