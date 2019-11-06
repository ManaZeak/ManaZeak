import TopBar from './controller/TopBar.js';
import Scene from './controller/Scene.js';
import FootBar from './controller/FootBar.js';
import Aside from './controller/Aside.js';
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
    this._topBar = {};
    this._scene = {};
    this._footBar = {};
    this._aside = {};
    this._loadingOverlay = {};
    this._titleAnimationId = -1;

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
    this._topBar = new TopBar();
    this._scene = new Scene();
    this._footBar = new FootBar();
    this._aside = new Aside();

    this._loadingOverlay = document.createElement('DIV');
    this._loadingOverlay.className = 'mzk-loading-overlay';
    this._loadingOverlay.setAttribute('data-before', 'Loading...');
  }


  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //


  /**
   * @method
   * @name buildMainPage
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Set the scene with the MainPageView
   **/
  setSceneView(options) {
    return new Promise(resolve => {
      Events.register({ // Views class themselves must fire a SceneViewReady event when ready
        name: 'SceneViewReady',
        oneShot: true
      }, () => {
        this.stopLoading(true);
        resolve();
      });

      this._aside.homeButtonSrcOnMainPage = true; // Append button by default (remove only if MainPage)
      if (options.name === 'MainPage') {
        this._aside.homeButtonSrcOnMainPage = false;
        this.startLoading(true)
          .then(this._scene.setMainPageView.bind(this._scene));
      } else if (options.name === 'Party') {
        this.startLoading(true)
          .then(this._scene.setPartyView.bind(this._scene));
      } else if (options.name === 'SingleArtist') {
        this.startLoading(true)
          .then(this._scene.setArtistView.bind(this._scene, options.artist));
      } else if (options.name === 'SingleAlbum') {
        this.startLoading(true)
          .then(this._scene.setAlbumView.bind(this._scene, options.album));
      } else if (options.name === 'SingleGenre') {
        this.startLoading(true)
          .then(this._scene.setGenreView.bind(this._scene, options.genre));
      } else if (options.name === 'AllArtists') {
        this.startLoading(true)
          .then(this._scene.setArtistsView.bind(this._scene));
      } else if (options.name === 'AllAlbums') {
        this.startLoading(true)
          .then(this._scene.setAlbumsView.bind(this._scene));
      } else if (options.name === 'AllGenres') {
        this.startLoading(true)
          .then(this._scene.setGenresView.bind(this._scene));
      } else if (typeof options.playlist === 'object' && options.playlist.id !== -1) { // Handle library views
        this.startLoading(true)
          .then(this._scene.updateLibraryView.bind(this._scene, options.playlist));
      } else if (options.name === 'AdminView') {
        this.startLoading(true)
          .then(this._scene.setAdminView.bind(this._scene));
      } else if (options.name === 'CommunityView') {
        this.startLoading(true)
          .then(this._scene.setCommunityView.bind(this._scene));
      }
    });
  }


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
    this._setPageTitle(`${track.artists} - ${track.title}`);
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
    this._clearPageTitle();
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


  updateQueuedTracks(queuedTracks) {
    this._footBar.updateQueuedTracks(queuedTracks);
  }


  getTrackById(id) {
    return this._scene.getTrackById(id);
  }


  startLoading(lockView = false) {
    return new Promise(resolve => {
      if (lockView === false) {
        this._topBar.startSpinner()
          .then(requestAnimationFrame(resolve));
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
          .then(requestAnimationFrame(resolve));
      } else if (lockView === true) {
        this._removeLoadingOverlay()
          .then(requestAnimationFrame(resolve));
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


  _setPageTitle(title) {
    // Remove any existing setTimeout before applying another
    this._clearPageTitle();
    // Launch recursive animation
    this._setPageTitleAnimation(`♪ ${title} `);
  }


  _setPageTitleAnimation(title) {
    document.title = title;
    this._titleAnimationId = setTimeout(() => {
      this._setPageTitleAnimation(`${title.substr(1)}${title.substr(0, 1)}`);
    }, 350);
  }


  _clearPageTitle() {
    document.title = 'ManaZeak';
    clearTimeout(this._titleAnimationId);
    this._titleAnimationId = -1;
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
   * @member {object} - The scene current active ui */
  get activeView() {
    return this._scene.view;
  }


  /** @public
   * @member {number} - The current scene ui first track dataset id */
  get firstTrackId() {
    return this._scene.firstTrackId;
  }


  /** @public
   * @member {number} - The current scene ui next track dataset id, according to the playing track */
  get nextTrackId() {
    return this._scene.nextTrackId;
  }


  /** @public
   * @member {number} - The current scene ui previous track dataset id, according to the playing track */
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
