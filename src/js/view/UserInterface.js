import TopBar from './topbar/TopBar.js';
import Scene from './maincontainer/Scene.js';
import FootBar from './footbar/FootBar.js';
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
    this._loadingOverlay = {};

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

    this._loadingOverlay = document.createElement('DIV');
    this._loadingOverlay.className = 'mzk-loading-overlay';
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

    if (isPlaying) { // Don't handle !playing (deactivate) bc pause != stop
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
    this._footBar.progressBar.setProgress(progress);
  }


  /**
   * @method
   * @name updateQueueNumber
   * @public
   * @memberof UserInterface
   * @author Arthur Beaulieu
   * @since March 2019
   * @description Updates the superscript queue length over the queue icon
   * @param {array} queue - The current session queue
   **/
  updateQueueNumber(queue) {
    this._footBar.updateQueueNumber(queue);
  }


  getTrackById(id) {
    return this._scene.getTrackById(id);
  }


  startLoading(lockView = false) {
    return new Promise(resolve => {
      if (lockView === false) {
        this._topBar.startSpinner()
          .then(resolve);
      } else if (lockView === true) {
        this._appendLoadingOverlay()
          .then(resolve);
      }
    });
  }


  stopLoading(lockView = false) {
    return new Promise(resolve => {
      if (lockView === false) {
        this._topBar.stopSpinner()
          .then(resolve);
      } else if (lockView === true) {
        this._removeLoadingOverlay()
          .then(resolve);
      }
    });
  }


  _appendLoadingOverlay() {
    return new Promise(resolve => {
      document.body.appendChild(this._loadingOverlay);
      requestAnimationFrame(resolve);
    });
  }


  _removeLoadingOverlay() {
    return new Promise(resolve => {
      document.body.removeChild(this._loadingOverlay);
      resolve();
    });
  }


  isFirstTrack() {
    return this._scene.isFirstTrack();
  }


  isLastTrack() {
    return this._scene.isLastTrack();
  }


  updateView(playlist) {
    this._scene.updateView(playlist);
  }


  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  GETTER / SETTER  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /** @public
   * @member {object} - The mzk footbar */
  get footBar() {
    return this._footBar;
  }


  /** @public
   * @member {object} - The scene current active view */
  get activeView() {
    return this._scene.view;
  }


  /** @public
   * @member {number} - The current scene view first track dataset id */
  get firstTrackId() {
    return this._scene.firstTrackId;
  }


  /** @public
   * @member {number} - The current scene view next track dataset id, according to the playing track */
  get nextTrackId() {
    return this._scene.nextTrackId;
  }


  /** @public
   * @member {number} - The current scene view previous track dataset id, according to the playing track */
  get previousTrackId() {
    return this._scene.previousTrackId;
  }


  /** @public
   * @member {number} - The repeat mode to set in range int[0, 2] */
  set repeatMode(value) {
    this._footBar.repeatMode = value;
  }


  /** @public
   * @member {number} - The repeat mode to set in range int[0, 2] */
  set shuffleMode(value) {
    this._footBar.shuffleMode = value;
  }


}

export default UserInterface;
