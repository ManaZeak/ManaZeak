import ListView from './views/library/ListView.js';
import AlbumView from './views/library/AlbumView.js';
import MainPageView from './views/mainpage/MainPageView.js';
import PartyView from './views/party/PartyView.js';
import SingleArtistView from './views/tag/SingleArtistView.js';
import SingleAlbumView from './views/tag/SingleAlbumView.js';
import SingleGenreView from './views/tag/SingleGenreView.js';
import AllArtistsView from './views/tag/all/AllArtistsView.js';
import AllAlbumsView from './views/tag/all/AllAlbumsView.js';
import AllGenresView from './views/tag/all/AllGenresView.js';
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
    this._isFullScreenView = false;

    this._sceneCommands = {};
    this._optionButton = {};
  }


  _removeFullView() {
    if (this._isFullScreenView === true) {
      this._isFullScreenView = false;
      document.body.removeChild(this.view.dom); // Remove current view from document
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
   * @description Add a new view in the scene (only append the DOM element)
   * @param {object} node - The DOM node to append to the scene
   * @param {boolean} isGlobal - Does view needs to be appended to the document or to the scene
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
    this._removeFullView();
    this._sceneViewType = 'MainPageView';
    this._scene.innerHTML = '';
    this.view = new MainPageView();
    this._registerViewReady();
  }


  /**
   * @method
   * @name setPartyView
   * @public
   * @memberof Scene
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Add a new view in the scene (only append the DOM element)
   **/
  setPartyView() {
    this._removeFullView();
    this._isFullScreenView = true;
    this._sceneViewType = 'PartyView';
    this._scene.innerHTML = '';
    this.view = new PartyView();
    this._registerViewReady();
  }


  setArtistView(artist) {
    this._removeFullView();
    this._sceneViewType = 'SingleArtistView';
    this._scene.innerHTML = '';
    this.view = new SingleArtistView(artist);
    this._registerViewReady();
  }


  setAlbumView(album) {
    this._removeFullView();
    this._sceneViewType = 'SingleAlbumView';
    this._scene.innerHTML = '';
    this.view = new SingleAlbumView(album);
    this._registerViewReady();
  }


  setGenreView(genre) {
    this._removeFullView();
    this._sceneViewType = 'SingleGenreView';
    this._scene.innerHTML = '';
    this.view = new SingleGenreView(genre);
    this._registerViewReady();
  }

  setArtistsView() {
    this._removeFullView();
    this._sceneViewType = 'AllArtistsView';
    this._scene.innerHTML = '';
    this.view = new AllArtistsView();
    this._registerViewReady();
  }


  setAlbumsView() {
    this._removeFullView();
    this._sceneViewType = 'AllAlbumsView';
    this._scene.innerHTML = '';
    this.view = new AllAlbumsView();
    this._registerViewReady();
  }


  setGenresView() {
    this._removeFullView();
    this._sceneViewType = 'AllGenresView';
    this._scene.innerHTML = '';
    this.view = new AllGenresView();
    this._registerViewReady();
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
    this._removeFullView();
    this._sceneViewType = 'LibraryView';
    this._scene.innerHTML = '';
    const options = {
      playlist: playlist,
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

    this._registerViewReady();
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
