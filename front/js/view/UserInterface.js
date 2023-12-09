import Aside from './element/Aside';
import TopBar from './element/TopBar';
import NavBar from './element/NavBar';
import Scene from './element/Scene';
import ViewHistory from './scene/utils/ViewHistory';
import MediaSessionController from './control/MediaSessionController';


class UserInterface {


  /** @summary <h1>ManaZeak user interface controller</h1>
   * @author Arthur Beaulieu
   * @since September 2020
   * @description <blockquote>This class is made to handle all interactions between UI and Mzk controller. It is in
   * charge to load views and to append them into the DOM, but also to make them interactive with the app context.</blockquote> */
  constructor() {
    /** @private
     * @member {object} - The aside controller */
    this._aside = new Aside();
    /** @private
     * @member {object} - The scene controller */
    this._scene = new Scene();

    this._topBar = new TopBar();
    this._navBar = new NavBar();

    this._history = new ViewHistory();
    this._msController = new MediaSessionController();

    this._wrapper = document.getElementById('scene-wrapper');
    /** @private
     * @member {object} - Home button icon */
    this._homeButton = document.getElementById('mzk-home-icon');
    /** @private
     * @member {object} - The DOM loading overlay to use in transitions */
    this._loadingOverlay = null;
    // Build loading overlay and add its style class
    this._loadingOverlay = document.getElementById('mzk-loading-overlay');
    // The HTML comes with the loading overlay visible
    this.stopLoading();
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -------------------------------------------  VIEW MANIPULATION  ----------------------------------------------  */
  /*                                                                                                                  */
  /*  These methods will set the single page with a new view, while properly cleaning the previously used one.        */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name setSceneView
   * @public
   * @memberof UserInterface
   * @description <blockquote>This method will try to build a view according to the given options. If options are
   * invalid, the Main Page will be loaded instead. It handle the transition with previous view to put a loading
   * overlay while loading the new view.</blockquote>
   * @param {object} options - The options to build the view from
   * @param {object} options.name - The view name, must match one in the ViewFactory class
   * @return {promise} - The action promise */
  setSceneView(options) {
    if (DEBUG) { console.log('UserInterface.setSceneView : called with (options)', options); }
    return new Promise((resolve, reject) => {
      this.startLoading()
        .then(this._updateHistory.bind(this, options))
        .then(this._updateHomeIcon.bind(this, options))
        .then(this._scene.buildView.bind(this._scene, options))
        .then(this._setTopBarView.bind(this, options))
        .then(resolve)
        .catch(reject)
        .finally(this.stopLoading.bind(this, options)); // Clear loading overlay whatever happens
    });
  }


  setModal(options) {
    if (DEBUG) { console.log('UserInterface.setModal : called with (options)', options); }
    return new Promise((resolve, reject) => {
      this._scene.buildModal(options)
        .then(resolve)
        .catch(reject);
    });
  }


  getFragment(url) {
    if (DEBUG) { console.log('UserInterface.getFragment : called with (url)', url); }
    // The loading overlay must be handled caller, since fragment is only a part of viewport
    return new Promise((resolve, reject) => {
      mzk.kom.getText(url).then(fragment => {
        resolve(fragment);
      }).catch(() => {
        Logger.raise('F_FRAGMENT_GET_ERROR');
        reject();
      });
    });
  }


  previousHistoryView() {
    if (DEBUG) { console.log('UserInterface.previousHistryView : called'); }
    const view = this._history.getPreviousView();
    if (view !== null) {
      mzk.setView(view);
    }
  }


  nextHistoryView() {
    if (DEBUG) { console.log('UserInterface.nextHistoryView : called'); }
    const view = this._history.getNextView();
    if (view !== null) {
      mzk.setView(view);
    }    
  }


  processLogFromServer(errors) {
    if (DEBUG) { console.log('UserInterface.processLogFromServer : called with (errors)', errors); }
    if (errors && errors.length > 0) {
      for (let i = 0; i < errors.length; ++i) {
        Logger.raise(errors[i]);
      }
    }
  }


  _updateHistory(options) {
    if (DEBUG) { console.log('UserInterface._updateHistory : called with (options)', options); }
    this._history.addView(options);
  }


  _updateHomeIcon(options) {
    if (DEBUG) { console.log('UserInterface._updateHomeIcon : called with (options)', options); }
    return new Promise(resolve => {
      if (options.name === 'MainPage') {
        this._homeButton.src = 'static/img/actions/random-roll.svg';
      } else if (this._homeButton.src !== 'static/img/navigation/home.svg') {
        this._homeButton.src = 'static/img/navigation/home.svg';
      }

      resolve();
    });
  }


  _setTopBarView(options) {
    if (DEBUG) { console.log('UserInterface.setTopBarView : called with (options)', options); }
    return new Promise(resolve => {
      this._topBar.setView(Object.assign({
        displayName: this._scene.view.getDisplayName()
      }, options));
      resolve();
    });
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ----------------------------------------  LOADING OVERLAY METHODS  -------------------------------------------  */
  /*                                                                                                                  */
  /*  These methods add/remove the loading overlay on top of elements. It is meant to be used when switching view.    */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name startLoading
   * @public
   * @memberof UserInterface
   * @description <blockquote>The start loading method will add an overlay on the whole page that has a css animation.</blockquote>
   * @return {promise} - The action promise */
  startLoading() {
    if (DEBUG) { console.log('UserInterface.startLoading : called'); }
    return new Promise(resolve => {
      if (!document.body.contains(this._loadingOverlay)) {
        document.body.appendChild(this._loadingOverlay);
      }
      requestAnimationFrame(resolve);
    });
  }


  /** @method
   * @name startLoading
   * @public
   * @memberof UserInterface
   * @description <blockquote>The stop loading method will remove the overlay on the page.</blockquote>
   * @return {promise} - The action promise */
  stopLoading() {
    if (DEBUG) { console.log('UserInterface.stopLoading : called'); }
    return new Promise(resolve => {
      if (document.body.contains(this._loadingOverlay)) {
        document.body.removeChild(this._loadingOverlay);
      }
      requestAnimationFrame(resolve);
    });
  }


  /* Playback */


  changeTrack(track) {
    if (DEBUG) { console.log('UserInterface.changeTrack : called with (track)', track); }
    if (track) {
      this._msController.setTrack(track);
      this._topBar.setTrack(track, mzk.ctrl.playObject);
      this._navBar.setQueuedTracks(mzk.ctrl.queuedTracks);
      this._navBar.setQueuedPlayObject(mzk.ctrl.playObject);
      this._navBar.updateMoodbar(track.mood);
      this.setPlay(true);
      this.setPageTitle(`${track.artist} – ${track.title}`);
    }
  }


  setPlay(playing) {
    if (DEBUG) { console.log('UserInterface.setPlay : called with (playing)', playing); }
    if (mzk.ctrl.playingId !== -1) { // Only set play if player is having loaded track
      if (playing === true) {
        if (!this._navBar.progressBar.isActive) {
          this._navBar.progressBar.activate();
        }
        this._navBar.updatePlayButton(true);
      } else {
        this._navBar.updatePlayButton(false);
        // Pause progress bar to avoid spamming getProgress on player
        // Deactivate would have close progressbar which is not 'pause' scenario
        this._navBar.progressBar.pause();
      }
    } else if (this._scene.view.playFirstTrack) {
      this._scene.view.playFirstTrack();
    } else {
      this._navBar.progressBar.deactivate();
    }
  }


  stopPlayback() {
    if (DEBUG) { console.log('UserInterface.stopPlayback : called'); }
    this._msController.setDefault();
    this._topBar.clearTrack();
    this._navBar.progressBar.deactivate();
    this._navBar.updatePlayButton(false);
    this.setPageTitle(`Mzk | Welcome!`);
    if (this._scene.view.stopPlayback) {
      this._scene.view.stopPlayback();
    }
  }


  queue(queuedTracks) {
    if (DEBUG) { console.log('UserInterface.queue : called with (queuedTracks)', queuedTracks); }
    this._navBar.setQueuedTracks(queuedTracks);
    Notif.new({
      type: 'info',
      title: 'Track(s) queue',
      message: `There is now currently ${queuedTracks.length} track(s) in the queue`
    })
  }


  getTrackById(id) {
    if (DEBUG) { console.log('UserInterface.getTrackById : called with (id)', id); }
    if (this._scene.view.getTrackById) {
      return this._scene.view.getTrackById(id);
    }
  }


  setRepeatMode(repeatMode) {
    if (DEBUG) { console.log('UserInterface.setRepeatMode : called with (repeatMode)', repeatMode); }
    this._navBar.setRepeatMode(repeatMode);
  }


  setPlaybackMode(playbackMode) {
    if (DEBUG) { console.log('UserInterface.setPlaybackMode : called with (playbackMode)', playbackMode); }
    this._navBar.setPlaybackMode(playbackMode);
  }


  setMute(player) {
    if (DEBUG) { console.log('UserInterface.setMute : called with (player)', player); }
    this._navBar.volumeBar.updateVolume(player.muted, player.volume);
  }


  setVolume(player) {
    if (DEBUG) { console.log('UserInterface.setVolume : called with (player)', player); }
    this._navBar.volumeBar.updateVolume(player.muted, player.volume);
  }


  setProgress(progress) {
    if (DEBUG) { console.log('UserInterface.setProgress : called with (progress)', progress); }
    this._navBar.progressBar.setProgress(progress);
    this._msController.updatePositionState();
  }


  setPlaybackRate(rate) {
    if (DEBUG) { console.log('UserInterface.setPlaybackRate : called with (rate)', rate); }
    this._navBar.playbackRateContext.updatePlaybackRate(rate);
  }


  setPageTitle(title) {
    if (DEBUG) { console.log('UserInterface.setPageTitle : called with (title)', title); }
    document.title = title;
  }


  setGradientColor(rgb) {
    if (DEBUG) { console.log('UserInterface.setGradientColor : called with (rgb)', rgb); }
    this._wrapper.style.setProperty('--background-gradient-override', `linear-gradient(rgb(${rgb.r}, ${rgb.g}, ${rgb.b}),var(--color-bg-darker))`);
    this._wrapper.style.setProperty('--background-gradient-override-opacity', 1);
    this._backgroundOverrideInProgress = true;
    /* Timeout to unlock gradient bug when resetting the same view */
    setTimeout(() => {
      delete this._backgroundOverrideInProgress;      
    }, 1000); // Match value with css transition time
  }


  restoreGradientColor() {
    if (DEBUG) { console.log('UserInterface.restoreGradientColor : called'); }
    this._wrapper.style.setProperty('--background-gradient-override-opacity', 0);
    setTimeout(() => {
      /* Avoid removing gradient when user reset the same page */ 
      if (!this._backgroundOverrideInProgress) {
        this._wrapper.style.setProperty('--background-gradient-override', 'none');
      }
    }, 1000); // Match value with css transition time
  }


  getViewDisplayName() {
    if (DEBUG) { console.log('UserInterface.getViewDisplayName : called'); }
    return this._scene.view.getDisplayName();
  }


  clearQueueTracks() {
    if (DEBUG) { console.log('UserInterface.clearQueueTracks : called'); }
    this.updateQueueNumber(0);
  }


  updateQueueNumber(length) {
    if (DEBUG) { console.log('UserInterface.updateQueueNumber : called with (length)', length); }
    this._navBar.updateQueueNumber(length);
  }


  getCurrentView() {
    if (DEBUG) { console.log('UserInterface.getCurrentView : called'); }
    return this._scene.view;
  }


}


export default UserInterface;
