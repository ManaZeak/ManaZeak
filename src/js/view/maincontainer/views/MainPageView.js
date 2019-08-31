import SceneView from '../SceneView';
'use strict';


class MainPageView extends SceneView {


  constructor(options) {
    super(options);

    this._dom = {
      wrapper: null
    };

    this._init();
  }


  _init() {
    mzk.komunikator.getTemplate('view/mainPage/layout/')
      .then((response) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');
        this._dom.wrapper = doc.getElementsByClassName('main-page')[0];
        Events.fire('SceneViewReady');
      });
  }


  get dom() {
    return this._dom.wrapper;
  }

  
}


export default MainPageView;