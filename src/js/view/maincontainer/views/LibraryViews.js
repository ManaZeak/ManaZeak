import SceneView from '../SceneView';
import ViewSwitcherContext from "../../utils/contexts/ViewSwitcherContext";
'use strict';

class LibraryViews extends SceneView {


  constructor(options) {
    super(options);

    this._container = {};
    this._optionButton = {};
    this._sceneCommands = {};
    this._sceneManipulations = {};
    this._centerOnTop = {};
    this._centerOnActiveTrack = {};
    this._lockCenternOn = {};
    this._centerOnBottom = {};
    this._activeView = {};

    this._activeViewLabel = options.viewLabel;
    this._viewSwitcher = new ViewSwitcherContext({
      target: document.body,
      url: 'contexts/changeview/'
    });
  }


  _events() {
    this._activeView.addEventListener('click', () => {
      if (document.body.contains(this._viewSwitcher.dom)) {
        this._viewSwitcher.close();
      } else {
        this._viewSwitcher.open();
      }
    });

    this._centerOnTop.addEventListener('click', () => {
      this.centerOn({
        position: 'top'
      });
    });

    this._centerOnActiveTrack.addEventListener('click', () => {
      this.centerOn({
        index: this.playingTrackIndex
      });
    });

    this._lockCenternOn.addEventListener('click', () => {
      const pref = mzk.user.getPreference('lock-center-on-track');
      if (pref === true) {
        mzk.user.setPreference('lock-center-on-track', false);
        this._lockCenternOn.src = '/static/img/actions/lock-off.svg';
      } else {
        mzk.user.setPreference('lock-center-on-track', true);
        this._lockCenternOn.src = '/static/img/actions/lock-on.svg';
      }
    });

    this._centerOnBottom.addEventListener('click', () => {
      this.centerOn({
        position: 'bottom'
      });
    });

    this._optionButton.addEventListener('click', () => {
      this._optionClicked();
    });
  }


  buildDom() {
    return new Promise((resolve, reject) => {
      mzk.komunikator.getTemplate('view/library/layout/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');
          const fragment = document.createDocumentFragment();

          this._optionButton = doc.getElementById('scene-view-option');
          this._sceneCommands = doc.getElementById('scene-commands');
          this._sceneManipulations = doc.getElementById('scene-manipulation');
          this._centerOnTop = doc.getElementById('center-on-top');
          this._centerOnActiveTrack = doc.getElementById('center-on-track');
          this._lockCenternOn = doc.getElementById('lock-center-on-track');
          this._centerOnBottom = doc.getElementById('center-on-bottom');

          this._activeView = this._sceneCommands.childNodes[1];
          this._activeView.innerHTML = this._activeViewLabel;

          fragment.appendChild(this._optionButton);
          fragment.appendChild(this._sceneCommands);
          fragment.appendChild(this._sceneManipulations);

          this._events();

          resolve(fragment);
        })
        .catch(reject);
    });
  }

}

export default LibraryViews;
