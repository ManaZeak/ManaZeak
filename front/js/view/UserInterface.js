import Aside from './element/Aside';
import TopBar from './element/TopBar';
import NavBar from './element/NavBar';
import Scene from './element/Scene';
import ViewHistory from './scene/utils/ViewHistory';


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
    return new Promise((resolve, reject) => {
      this.startLoading()
        .then(this._updateHistory.bind(this, options))
        .then(this._updateHomeIcon.bind(this, options))
        .then(this._scene.buildView.bind(this._scene, options))
        .then(this._setTopBarView.bind(this, options))
        .then(resolve)
        .catch(reject)
        .finally(this.stopLoading.bind(this)); // Clear loading overlay whatever happens
    });
  }


  setModal(options) {
    return new Promise((resolve, reject) => {
      this._scene.buildModal(options)
        .then(resolve)
        .catch(reject);
    });
  }


  getFragment(url) {
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
    const view = this._history.getPreviousView();
    if (view !== null) {
      mzk.setView(view);
    }
  }


  nextHistoryView() {
    const view = this._history.getNextView();
    if (view !== null) {
      mzk.setView(view);
    }    
  }


  processLogFromServer(errors) {
    if (errors && errors.length > 0) {
      for (let i = 0; i < errors.length; ++i) {
        Logger.raise(errors[i]);
      }
    }
  }


  _updateHistory(options) {
    this._history.addView(options);
  }


  _updateHomeIcon(options) {
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
    return new Promise(resolve => {
      if (document.body.contains(this._loadingOverlay)) {
        document.body.removeChild(this._loadingOverlay);
      }
      requestAnimationFrame(resolve);
    });
  }


  /* Playback */


  changeTrack(track) {
    if (track) {
      this._topBar.setTrack(track, mzk.ctrl.playObject);
      this._navBar.setQueuedTracks(mzk.ctrl.queuedTracks);
      this._navBar.setQueuedPlayObject(mzk.ctrl.playObject);
      this._navBar.updateMoodbar(track.mood);
      this.setPlay(true);
      this.setPageTitle(`${track.artist} – ${track.title}`);
    }
  }


  setPlay(playing) {
    if (mzk.ctrl.playingId !== -1) { // Only set play if payer is indeed playing
      if (!this._navBar.progressBar.isActive) {
        this._navBar.progressBar.activate();
      }
      this._navBar.updatePlayButton(playing);
    } else if (this._scene.view.playFirstTrack) {
      this._scene.view.playFirstTrack();
    } else {
      this._navBar.progressBar.deactivate();      
    }
  }


  stopPlayback() {
    this._topBar.clearTrack();
    this._navBar.progressBar.deactivate();
    this._navBar.updatePlayButton(false);
    this.setPageTitle(`Mzk | Welcome!`);
    if (this._scene.view.stopPlayback) {
      this._scene.view.stopPlayback();
    }
  }


  queue(queuedTracks) {
    this._navBar.setQueuedTracks(queuedTracks);
    
  }


  getTrackById(id) {
    if (this._scene.view.getTrackById) {
      return this._scene.view.getTrackById(id);
    }
  }


  setRepeatMode(repeatMode) {
    this._navBar.setRepeatMode(repeatMode);
  }


  setShuffleMode(shuffleMode) {
    this._navBar.setShuffleMode(shuffleMode);
  }


  setMute(player) {
    this._navBar.volumeBar.updateVolume(player.muted, player.volume);
  }


  setVolume(player) {
    this._navBar.volumeBar.updateVolume(player.muted, player.volume);
  }


  setProgress(progress) {
    this._navBar.progressBar.setProgress(progress); 
  }


  setPlaybackRate(rate) {
    this._navBar.playbackRateContext.updatePlaybackRate(rate);
  }


  setPageTitle(string) {
    document.title = string;
  }


  setGradientColor(rgb) {
    if (rgb.r > 133 && rgb.g > 133 && rgb.b > 133) {
      // Darken if too bright
      rgb.r -= 100;
      rgb.g -= 100;
      rgb.b -= 100;
    } else if (rgb.r < 66 && rgb.g < 66 && rgb.b < 66) {
      // Lighten if too dark
      rgb.r += 33;
      rgb.g += 33;
      rgb.b += 33;
    }
    this._wrapper.style.backgroundImage = `linear-gradient(rgb(${rgb.r}, ${rgb.g}, ${rgb.b}),var(--color-bg-darker))`;
  }


  restoreGradientColor() {
    this._wrapper.style.backgroundImage = `linear-gradient(var(--color-bg-lighter),var(--color-bg-darker))`;
  }


  getViewDisplayName() {
    return this._scene.view.getDisplayName();
  }


  clearQueueTracks() {
    this.updateQueueNumber(0);
  }


  updateQueueNumber(length) {
    this._navBar.updateQueueNumber(length);
  }

}


export default UserInterface;
