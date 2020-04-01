import ListView from '../view/library/type/ListView.js';
import AlbumView from '../view/library/type/AlbumView.js';
import UserIDModal from '../modal/UserIDModal';
import ViewFactory from '../view/ViewFactory';
import AboutModal from "../modal/AboutModal";
import SuggestionModal from "../modal/SuggestionModal";
'use strict';


class Scene {
  /**
   * @summary ManaZeak main scene to renders sceneviews in
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle the main scene
   **/
  constructor() {
    this._scene = document.getElementById('scene');
    this.view = {};
    this._sceneViewType = '';
    this._isFullScreenView = false;

    this._sceneCommands = {};
    this._optionButton = {};
  }


  _setAsideToggle(state) {
    mzk.ui.aside.enabled = state;
  }


  _removeFullView() {
    if (this._isFullScreenView === true) {
      this._isFullScreenView = false;
      document.body.removeChild(this.view.dom); // Remove current ui from document
    }
  }


  _registerViewReady() {
    Events.register({
      name: 'SceneViewReady',
      oneShot: true
    }, () => {
      this.addView(this.view.dom);
    });
  }


  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //


  /**
   * @method
   * @name addView
   * @public
   * @memberof Scene
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Add a new ui in the scene (only append the DOM element)
   * @param {object} node - The DOM node to append to the scene
   * @param {boolean} isGlobal - Does ui needs to be appended to the document or to the scene
   **/
  addView(node, isGlobal = this._isFullScreenView) {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(node);

    if (isGlobal === false) {
      this._scene.appendChild(fragment);
    } else {
      document.body.appendChild(fragment);
    }
  }


  setSceneView(type, options) {
    this._removeFullView(); // Clean existing view
    this._scene.innerHTML = ''; // Clear any DOM in scene
    this._registerViewReady(); // Prepare scene to receive the `SceneViewReady` event (from any instantiated view)

    if (typeof options.playlist === 'object' && options.playlist.id !== -1) {
      this.updateLibraryView(options.playlist);
    } else {
      this.view = new ViewFactory(type, options);

      if (this.view === null) {
        this.setSceneView({ name: 'MainPage' });
      } else {
        this._sceneViewType = `${type}View`;
        this._setAsideToggle(!this.view.asideLock); // Depends on view (for ex lib view can't allow aside's toggle (too costly render)
      }
    }
  }


  setModal(options) {
    return new Promise(resolve => {
      if (options.name === 'UserID') {
        new UserIDModal({
          url: 'modal/userID'
        });
      } else if (options.name === 'About') {
        new AboutModal({
          url: 'modal/about'
        });
      } else if (options.name === 'Suggestion') {
        new SuggestionModal({
          url: 'modal/suggestion'
        });
      }

      resolve();
    });
  }


  update() {
    this.view.update();
  }


  /**
   * @method
   * @name updateLibraryView
   * @public
   * @memberof Scene
   * @author Arthur Beaulieu
   * @since September 2018
   * @description MUST BE CALLED AFTER APPENDING LIBRARYPAGE HTML TEMPLATE TO THE DOM - Update the current ui with the given playlist (collection editing mode)
   * @param {object} playlist - The playlist to update the ui with
   **/
  updateLibraryView(playlist) {
    this._setAsideToggle(false);
    this._removeFullView();
    this._sceneViewType = 'LibraryView';
    const options = {
      playlist: playlist,
      lockCenterOnFlag: mzk.user.getPreference('lock-center-on-track'),
      playingTrackIndex: this.view.playingTrackIndex,
      selection: this.view.selection,
      viewLabel: '' // TBD in setLangFeedback of view
    };

    if (playlist.activeView === 'ListView') {
      options.viewLabel = 'ListView';
      this.view = new ListView(options);
    } else if (playlist.activeView === 'AlbumView') {
      options.viewLabel = 'DetailsView';
      this.view = new AlbumView(options);
    }
    // For Library ui, we must register a custom resolution for SceneViewReady
    Events.register({
      name: 'SceneViewReady',
      oneShot: true
    }, () => {
      this.addView(this.view.dom);
      this.view.refreshView(); // Mainly tu update ListView column header
    });
  }


  stopPlayback() {
    this.view.stopPlayback();
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
