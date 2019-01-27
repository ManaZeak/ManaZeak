import TopBar from './topbar/TopBar.js';
import Scene from './maincontainer/Scene.js';
import FootBar from './footbar/FootBar.js';
import Modal from '../utils/Modal.js';
'use strict';


class UserInterface {
  /**
   * @summary Fronted View class
   * @author Arthur Beaulieu
   * @since September 2018
   * @description <blockquote>Handle everything that is UI. Not meant AT ALL to handle data modelisation, use <code>Model.js</code>.
   * This class is meant to be accessed from anywhere in the app, since it is attached to the Mzk object.</blockquote>
   **/
  constructor() {
    this._mainContainer = {};
    this._topBar = {};
    this._scene = {};
    this._footBar = {};

    this.modal = new Modal();

    this._init();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _init
   * @private
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the View object width TopBar, FootBar and Scene
   **/
  _init() {
    this._mainContainer = document.getElementById('mainContainer'); // Used when switching Discover (anciennement modes (partyview, managotit etc))

    this._topBar = new TopBar();
    this._scene = new Scene();
    this._footBar = new FootBar();

    this._footBar.volumeBar.updateVolume(mzk.playerMuted, mzk.playerVolume);
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name changeTrack
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Change UI elements according to the new playing track informations
   **/
  changeTrack(track) {
    this.clearMoodbar();
    this.togglePlay();
    this._scene.changeTrack(track.id);
    this._footBar.renderMoodFile(track.moodbar);
    this._footBar.progressBar.updateDuration(mzk.model.player.duration);
  }

  /**
   * @method
   * @name togglePlay
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Change UI elements according to the new playing state
   **/
  togglePlay() {
    const isPlaying = mzk.model.player.playing;
    this._footBar.updatePlayButton(isPlaying);

    if (isPlaying) { // Don't handle !playing (desactivate) bc pause != stop
      this._footBar.progressBar.activate(); // Activate make the progress bar appear w/ animation
    }
  }

  /**
   * @method
   * @name stopPlayback
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Updates UI element to match the player stand by state
   **/
  stopPlayback() {
    this.clearMoodbar();
    this._footBar.updatePlayButton(false); // Send !isPlaying to restore play icon
    this._footBar.progressBar.resetProgressBar();
    this._scene.stopPlayback();
  }

  /**
   * @method
   * @name initPlaylist
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the given playlist into the scene/view
   * @param {object} playlist - The playlist to init the view with
   **/
  initPlaylist(playlist) {
    this._scene.updateView(playlist);
  }

  /**
   * @method
   * @name updateVolume
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Update the volume values in the UI according to the player's value
   **/
  updateVolume() {
    this._footBar.volumeBar.updateVolume(mzk.playerMuted, mzk.playerVolume);
  }


  clearMoodbar() {
    d3.selectAll('.moodbar svg g').remove();
  }


  /**
   * @method
   * @name updateProgress
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Updates the progress bar according to the player progress' value
   **/
  updateProgress() { // Called onClick
    const progress = mzk.model.player.progress;
    this._footBar.progressBar.desactivateTransitions(); // Must disable transition when called
    this._footBar.progressBar.setProgress(progress);

    setTimeout(function() { // Restore transitions
      this._footBar.progressBar.activateTransitions();
    }.bind(this), 50); // 5 is fine, but 50 is more 'lag friendly'
  }


  /** @method
   * @name addOverlay
   * @public
   * @memberof View
   * @description Add an overlay div (modal style) over the scene
   * @param {object} node - The DOM node to append to the scene as an overlay
   **/
  addOverlay(node) {
    const overlay = document.createElement('DIV');
    const fragment = document.createDocumentFragment();

    overlay.id = 'overlay';
    overlay.appendChild(node);
    fragment.appendChild(overlay);

    this._mainContainer.appendChild(fragment);
  }


  removeOverlay() {
    this._mainContainer.removeChild(document.getElementById('overlay'));
  }


  displayModal(options) {
    mzk.komunikator.getTemplate(options.url)
      .then((response) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');
        const modal = doc.getElementsByClassName('modal')[0];
        this.addOverlay(modal);

        this.modal.newLibrary({
          callback: options.callback
        });
      });
  }


  getTrackById(id) {
    return this._scene.getTrackById(id);
  }


  startLoading() {
    return new Promise(resolve => {
      this._scene.startLoading()
        .then(resolve);
    });
  }


  stopLoading() {
    return new Promise(resolve => {
      this._scene.stopLoading()
        .then(resolve);
    });
  }


  isLastTrack() {
    return this._scene.isLastTrack();
  }


  updateView(playlist) {
    this._scene.updateView(playlist);
  }


  //  --------------------------------  GETTER METHODS   --------------------------------  //


  get activeView() {
    return this._scene.view;
  }


  get firstTrackId() {
    return this._scene.firstTrackId;
  }


  get nextTrackId() {
    return this._scene.nextTrackId;
  }


  get previousTrackId() {
    return this._scene.previousTrackId;
  }


  set repeatMode(value) {
    this._footBar.repeatMode = value;
  }
}

export default UserInterface;
