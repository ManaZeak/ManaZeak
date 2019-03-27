import ListView from './views/ListView.js';
import AlbumView from './views/AlbumView.js';
import ViewSwitcherContext from '../utils/contexts/ViewSwitcherContext.js';
'use strict';

class Scene {
  /**
   * @summary ManaZeak main scene to renders views in
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle the main scene
   **/
  constructor() {
    this._scene = document.getElementById('scene');
    this._optionButton = document.getElementById('scene-view-option');
    this.view = {};

    this._sceneCommands = document.getElementById('scene-commands');
    this._activeViewLabel = this._sceneCommands.childNodes[1];
    this._viewSwitcher = new ViewSwitcherContext({
      target: document.body,
      url: 'contexts/changeview/'
    });


    this._sceneManipulations = document.getElementById('scene-manipulation');
    this._centerOnTop = document.getElementById('center-on-top');
    this._centerOnActiveTrack = document.getElementById('center-on-track');
    this._lockCenternOn = document.getElementById('lock-center-on-track');
    this._centerOnBottom = document.getElementById('center-on-bottom');

    this._events();
  }


  _events() {
    this._activeViewLabel.addEventListener('click', () => {
      if (this._scene.contains(this._viewSwitcher.dom)) {
        this._viewSwitcher.close();
      } else {
        this._viewSwitcher.open();
      }
    });

    this._centerOnTop.addEventListener('click', () => {
      this.view.centerOn({
        position: 'top'
      });
    });

    this._centerOnActiveTrack.addEventListener('click', () => {
      this.view.centerOn({
        index: this.view.playingTrackIndex
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
      this.view.centerOn({
        position: 'bottom'
      });
    });

    this._optionButton.addEventListener('click', () => {
      this._optionClicked();
    });
  }


  _optionClicked() {
    let sceneContext = this._scene.querySelector('.scene-options');

    if (sceneContext !== null) { // Close context
      sceneContext.parentNode.remove();
      return;
    }

    // Otherwise, append context, and fill it with its content
    const overlay = document.createElement('DIV');
    overlay.classList.add('context-transparent-overlay'); // TODO move this else where no ? like in viewoptionscontext maybe ?
    overlay.addEventListener('click', (event) => {
      if (!event.target.closest('.scene-options')) {
        sceneContext.parentNode.remove();
      }
    }, true);

    sceneContext = document.createElement('DIV');
    sceneContext.className = 'scene-options';

    overlay.appendChild(sceneContext);
    this._scene.appendChild(overlay);
    this.view.fillContext(sceneContext);
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //


  stopPlayback() {
    this.view.stopPlayback(); // Warning, this is specific to listView so far
  }


  /**
   * @method
   * @name addView
   * @public
   * @memberof Scene
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Add a new view in the scene (only append the DOM element)
   * @param {object} node - The DOM node to append to the scene
   **/
  addView(node) {
    this._scene.innerHTML = '';
    this._scene.appendChild(this._sceneCommands);
    this._scene.appendChild(this._sceneManipulations);
    this._scene.appendChild(this._optionButton);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(node);
    this._scene.appendChild(fragment);
  }


  /**
   * @method
   * @name updateView
   * @public
   * @memberof Scene
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Update the current view with the given playlist
   * @param {object} playlist - The playlist to update the view with
   **/
  updateView(playlist) {
    const options = {
      playingTrackIndex: this.view.playingTrackIndex,
      selection: this.view.selection
    };

    if (playlist.activeView === 'ListView') {
      this.view = new ListView(options);
      this._activeViewLabel.innerHTML = 'Tracks';
    }

    else if (playlist.activeView === 'AlbumView') {
      this.view = new AlbumView(options);
      this._activeViewLabel.innerHTML = 'Artists';
    }

    this.addView(this.view.dom);
    this.view.addTracks(playlist.artists);
  }


  changeTrack(id) {
    this.view.changeTrack(id);
  }


  centerOn(index) {
    this.view.centerOn({
      index: index
    });
  }


  getTrackById(id) {
    return this.view.getTrackById(id);
  }


  isFirstTrack() {
    return this.view.isFirstTrack();
  }


  isLastTrack() {
    return this.view.isLastTrack();
  }


  startLoading() {
    return new Promise(resolve => {
      const spinner = document.createElement('DIV');
      spinner.id = 'loading-spinner';
      this._scene.appendChild(spinner);
      setTimeout(() => {
        resolve();
      }, 50); // Ensure spinner has started its animation before resolving the promise
    });
  }

  stopLoading() {
    return new Promise(resolve => {
        const spinner = this._scene.querySelector("#loading-spinner");
        if (spinner != null) {
            this._scene.removeChild(spinner);
        }
        resolve();
    });
  }


  get nextTrackId() {
    return this.view.nextTrackId;
  }


  get previousTrackId() {
    return this.view.previousTrackId;
  }


  get firstTrackId() {
    return this.view.firstTrackId;
  }
}

export default Scene;
