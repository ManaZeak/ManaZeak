import ViewSwitcherContext from "../../context/ViewSwitcherContext";
import PlayableView from "../PlayableView";
'use strict';

class LibraryViews extends PlayableView {


  constructor(options) {
    super(options);

    this._scrollBar = {};
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
      url: 'context/changeview/'
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
      const prefName = 'lock-center-on-track';
      const pref = mzk.user.getPreference(prefName);
      if (pref === true) {
        this._lockCenterOnFlag = false;
        mzk.user.setPreference(prefName, false);
        this._lockCenternOn.src = '/static/img/actions/lock-off.svg';
        this._lockCenternOn.parentNode.dataset.tooltip = mzk.lang.libraryview.lockcenter.off;
      } else {
        this._lockCenterOnFlag   = true;
        mzk.user.setPreference(prefName, true);
        this._lockCenternOn.src = '/static/img/actions/lock-on.svg';
        this._lockCenternOn.parentNode.dataset.tooltip = mzk.lang.libraryview.lockcenter.on;
      }
    });

    this._centerOnBottom.addEventListener('click', () => {
      this.centerOn({
        position: 'bottom'
      });
    });

    if (this._activeViewLabel === 'ListView') {
      this._optionButton.addEventListener('click', () => {
        this._optionClicked();
      });
    }
  }


  buildDom() {
    return new Promise((resolve, reject) => {
      mzk.komunikator.getTemplate('view/library/layout/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');
          const container = doc.getElementsByClassName('library-page')[0];

          this._optionButton = doc.getElementById('scene-view-option');
          this._sceneCommands = doc.getElementById('scene-commands');
          this._sceneManipulations = doc.getElementById('scene-manipulation');
          this._centerOnTop = doc.getElementById('center-on-top');
          this._centerOnActiveTrack = doc.getElementById('center-on-track');
          this._lockCenternOn = doc.getElementById('lock-center-on-track');
          this._centerOnBottom = doc.getElementById('center-on-bottom');

          this._setLangFeedback();

          this._activeView = this._sceneCommands.childNodes[1];
          this._activeView.innerHTML = mzk.lang.libraryview[this._activeViewLabel];

          if (this._activeViewLabel === 'DetailsView') {
            this._optionButton.style.display = 'none';
          }

          this._events();

          resolve(container);
        })
        .catch(reject);
    });
  }


  _setLangFeedback() {
    this._centerOnTop.parentNode.dataset.tooltip = mzk.lang.libraryview.centertop;
    this._centerOnActiveTrack.parentNode.dataset.tooltip = mzk.lang.libraryview.centertrack;
    this._lockCenternOn.parentNode.dataset.tooltip = mzk.lang.libraryview.lockcenter.off; // Auto center is off by default
    this._centerOnBottom.parentNode.dataset.tooltip = mzk.lang.libraryview.centerbottom;

    if (Utils.isMobileDevice() === true) {
      const bottom = 'tooltip-bottom';
      this._centerOnTop.parentNode.classList.add(bottom);
      this._centerOnActiveTrack.parentNode.classList.add(bottom);
      this._lockCenternOn.parentNode.classList.add(bottom);
      this._centerOnBottom.parentNode.classList.add(bottom);
    } else {
      const left = 'tooltip-left';
      this._centerOnTop.parentNode.classList.add(left);
      this._centerOnActiveTrack.parentNode.classList.add(left);
      this._lockCenternOn.parentNode.classList.add(left);
      this._centerOnBottom.parentNode.classList.add(left);
    }
  }


  addTracks() {
    // Method must be implement in chil class
  }


  centerOn(options) {
    let index = -1;

    if (options.position) {
      this._boundCentering(options.position);
    } else {
      index = this._getIndexToCenterOn(options);

      if (index === -1) {
        return;
      }

      const relativeDelta = this._tracks[index].dom.offsetTop + this._tracks[index].dom.scrollHeight / 2;
      this._dom.container.scrollTop = relativeDelta - this._dom.container.clientHeight / 2;
    }
  }


  _boundCentering(position) {
    if (position === 'top') {
      this._dom.container.scrollTop = 0;
    } else if (position === 'bottom') {
      const relativeDelta = this._tracks[this._tracks.length -1].dom.offsetTop + this._tracks[this._tracks.length -1].dom.scrollHeight / 2;
      this._dom.container.scrollTop = relativeDelta - this._dom.container.clientHeight / 2;
    }
  }


  get dom() {
    return this._dom.fragment;
  }


}

export default LibraryViews;
