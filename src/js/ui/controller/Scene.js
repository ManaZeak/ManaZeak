import MainPageView from '../view/mainpage/MainPageView.js';
import PartyView from '../view/party/PartyView.js';
import SingleArtistView from '../view/object/single/type/SingleArtistView.js';
import SingleAlbumView from '../view/object/single/type/SingleAlbumView.js';
import SingleGenreView from '../view/object/single/type/SingleGenreView.js';
import AllArtistsView from '../view/object/all/type/AllArtistsView.js';
import AllAlbumsView from '../view/object/all/type/AllAlbumsView.js';
import AllGenresView from '../view/object/all/type/AllGenresView.js';
import ListView from '../view/library/type/ListView.js';
import AlbumView from '../view/library/type/AlbumView.js';
import AdminView from '../view/admin/AdminView.js';
import CommunityView from '../view/community/CommunityView.js';
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


  /**
   * @method
   * @name setMainPageView
   * @public
   * @memberof Scene
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Add a new ui in the scene (only append the DOM element)
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
   * @description Add a new ui in the scene (only append the DOM element)
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
   * @description MUST BE CALLED AFTER APPENDING LIBRARYPAGE HTML TEMPLATE TO THE DOM - Update the current ui with the given playlist (collection editing mode)
   * @param {object} playlist - The playlist to update the ui with
   **/
  updateLibraryView(playlist) {
    this._removeFullView();
    this._sceneViewType = 'LibraryView';
    this._scene.innerHTML = '';
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
    }

    else if (playlist.activeView === 'AlbumView') {
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


  setAdminView() {
    this._removeFullView();
    this._sceneViewType = 'AdminView';
    this._scene.innerHTML = '';
    this.view = new AdminView();
    this._registerViewReady();
  }


  setCommunityView() {
    this._removeFullView();
    this._sceneViewType = 'CommunityView';
    this._scene.innerHTML = '';
    this.view = new CommunityView();
    this._registerViewReady();
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
