import ListView from './views/library/ListView.js';
import AlbumView from './views/library/AlbumView.js';
import MainPageView from './views/MainPageView.js';
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
    this.view = {};
    this._sceneViewType = '';

    this._sceneCommands = {};
    this._optionButton = {};
  }


  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //


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
    const fragment = document.createDocumentFragment();
    fragment.appendChild(node);
    this._scene.appendChild(fragment);
  }


  /**
   * @method
   * @name setMainPageView
   * @public
   * @memberof Scene
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Add a new view in the scene (only append the DOM element)
   * @param {object} node - The DOM node to append to the scene
   **/
  setMainPageView(node) {
    this._sceneViewType = 'MainPageView';
    this._scene.innerHTML = '';
    this.view = new MainPageView();

    Events.register({
      name: 'SceneViewReady',
      oneShot: true
    }, () => {
      this.addView(this.view.dom);
    });
  }


  /**
   * @method
   * @name updateLibraryView
   * @public
   * @memberof Scene
   * @author Arthur Beaulieu
   * @since September 2018
   * @description MUST BE CALLED AFTER APPENDING LIBRARYPAGE HTML TEMPLATE TO THE DOM - Update the current view with the given playlist (collection editing mode)
   * @param {object} playlist - The playlist to update the view with
   **/
  updateLibraryView(playlist) {
    this._sceneViewType = 'LibraryView';
    this._scene.innerHTML = '';
    const options = {
      playingTrackIndex: this.view.playingTrackIndex,
      selection: this.view.selection,
      viewLabel: ''
    };

    if (playlist.activeView === 'ListView') {
      options.viewLabel = 'List';
      this.view = new ListView(options);
    }

    else if (playlist.activeView === 'AlbumView') {
      options.viewLabel = 'Artists';
      this.view = new AlbumView(options);
    }

    Events.register({
      name: 'SceneViewReady',
      oneShot: true
    }, () => {
      this.addView(this.view.dom);
      this.view.addTracks(playlist.artists);
    });
  }


  stopPlayback() {
    if (this._sceneViewType === 'LibraryView') {
      this.view.stopPlayback(); // Warning, this is specific to listView so far
    }
  }


  changeTrack(id) {
    if (this._sceneViewType === 'LibraryView') {
      this.view.changeTrack(id);
    }
  }


  centerOn(index) {
    if (this._sceneViewType === 'LibraryView') {
      this.view.centerOn({
        index: index
      });
    }
  }


  getTrackById(id) {
    if (this._sceneViewType === 'LibraryView') {
      return this.view.getTrackById(id);
    } else {
      return -1;
    }
  }


  isFirstTrack() {
    if (this._sceneViewType === 'LibraryView') {
      return this.view.isFirstTrack();
    } else {
      return -1;
    }
  }


  isLastTrack() {
    if (this._sceneViewType === 'LibraryView') {
      return this.view.isLastTrack();
    } else {
      return -1;
    }
  }


  get nextTrackId() {
    if (this._sceneViewType === 'LibraryView') {
      return this.view.nextTrackId;
    } else {
      return -1;
    }
  }


  get previousTrackId() {
    if (this._sceneViewType === 'LibraryView') {
      return this.view.previousTrackId;
    } else {
      return -1;
    }
  }


  get firstTrackId() {
    if (this._sceneViewType === 'LibraryView') {
      return this.view.firstTrackId;
    } else {
      return -1;
    }
  }
}

export default Scene;
