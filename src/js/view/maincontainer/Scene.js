import ListView from './views/library/ListView.js';
import AlbumView from './views/library/AlbumView.js';
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
    this.view = {};

    this._sceneCommands = {};
    this._optionButton = {};
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
   * @description MUST BE CALLED AFTER APPENDING LIBRARYPAGE HTML TEMPLATE TO THE DOM - Update the current view with the given playlist (collection editing mode)
   * @param {object} playlist - The playlist to update the view with
   **/
  updateView(playlist) { // TODO rename updateLibraryView
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
      name: 'SceneView',
      oneShot: true
    }, () => {
      this.addView(this.view.dom);
      this.view.addTracks(playlist.artists);
    });
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
