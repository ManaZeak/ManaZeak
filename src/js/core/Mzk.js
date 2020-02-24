import Komunikator from './Komunikator.js';
import Model from '../model/Model.js';
import UserInterface from '../ui/UserInterface.js';
import User from './User.js';
import Notification from "../ui/component/Notification";
import TapBpmModal from "../ui/modal/TapBpmModal";

import RepeatModeEnum from "../utils/enum/RepeatModeEnum";
import PlaybackModeEnum from "../utils/enum/PlaybackModeEnum";
import VolumeControllerEnum from "../utils/enum/VolumeControllerEnum";
import ProgressControllerEnum from "../utils/enum/ProgressControllerEnum";
'use strict';


class Mzk {


  /**
   * @summary ManaZeak main controller
   * @author Arthur Beaulieu
   * @since September 2018
   * @description <blockquote>Control the whole ManaZeak user session. Handle both Model and the user interface, and animate them accordingly.
   * Host User, Language and Komunikator also.</blockquote>
   **/
  constructor() {
    /** @public
     * @member {object} - User session cookies */
    this.cookies = {};
    /** @public
     * @member {object} - ManaZeak server Komunikator */
    this.komunikator = {};
    /** @public
     * @member {object} - Local language values */
    this.lang = {};
    /** @public
     * @member {object} - Front end model */
    this.model = {};
    /** @public
     * @member {object} - Session user object */
    this.user = {};
    /** @public
     * @member {object} - ManaZeak User Interface */
    this.ui = {};
  }


  //  ------------------------------------------------------------------------------------------------//
  //  ----------------------------------  SESSION INITIALIZATION  ----------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name start
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init a ManaZeak session depending on user settings in db
   **/
  start() {
    this.cookies = Utils.getCookies(); // Get user cookies

    this._initKomunikator()
      .then(this._initLang.bind(this))
      .then(this._initUser.bind(this))
      .then(this._initUi.bind(this))
      .then(this._initModel.bind(this))
      .then(this._initShortcut.bind(this))
      .then(Events.fire.bind(Events, 'MzkInitDone'))
      .then(this._startApp.bind(this))
      .catch(() => {
        Logger.raise({
          code: 'FATAL_ERROR',
          frontend: true
        });
      });
  }


  /**
   * @method
   * @name _initKomunikator
   * @private
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the Komunikator object (cookies must have been stored before)
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _initKomunikator() {
    return new Promise(resolve => {
      this.komunikator = new Komunikator({
        csrfToken: this.cookies['csrftoken']
      });
      resolve();
    });
  }


  /**
   * @method
   * @name _initUser
   * @private
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the User object
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _initUser() {
    return new Promise((resolve, reject) => {
      this.user = new User();
      this.komunikator.get('user/getInformation/')
        .then(userInfo => {
          this.user.setMembers(userInfo);
          resolve();
        })
        .catch(errorCode => {
          Logger.raise({
            code: errorCode,
            frontend: true
          });
          reject();
        });
    });
  }


  /**
   * @method
   * @name _initLang
   * @private
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the front keys and attach them to this
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _initLang() {
    const checkLang = (lang) => { // In case language JSON can not be fetched, we raise a manual notification only.
      if (lang.DONE) {
        this.lang = lang;
      } else {
        Notification.new({
          type: 'error',
          title: 'Unable to load language',
          message: 'Something went wrong, languages settings can not be received.'
        });
      }
    };

    return new Promise(resolve => {
      const options = {
        LANG: (navigator.language || navigator.userLanguage)
      };

      this.komunikator.post('language/', options)
        .then(lang => {
          checkLang(lang);
          resolve();
        }); // Errors can not be catched since language failed loading.
    });
  }


  /**
   * @method
   * @name _initModel
   * @private
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the frontend Model
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _initModel() {
    return new Promise(resolve => {
      this.model = new Model();
      this.ui.updateVolume();
      resolve();
    });
  }


  /**
   * @method
   * @name _initUi
   * @private
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the frontend Ui
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _initUi() {
    return new Promise(resolve => {
      this.ui = new UserInterface();
      resolve();
    });
  }


  /**
   * @method
   * @name _initShortcut
   * @private
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the user shortcuts
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _initShortcut() {
    return new Promise(resolve => {
      this.reloadShortcuts();
      resolve();
    });
  }


  /**
   * @method
   * @name _startApp
   * @private
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Start the UI building (must be called when everything have been safely initialized)
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _startApp() {
    return new Promise((resolve, reject) => {
      this.ui.setSceneView({ name: 'MainPage' }) // Init ManaZeak with the MainPage
        .then(this._buildCollection.bind(this)) // Load in background the user collection so libraries are available from MainPage
        .then(resolve)
        .catch(reject);
    });
  }


  /**
   * @method
   * @name _buildCollection
   * @private
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Build the user collection of libraries and playlist (to be used in LibraryViews mode)
   * @returns {Promise} - A promise that resolve when logic has been executed, rejected otherwise
   **/
  _buildCollection() {
    return new Promise((resolve, reject) => {
      this.ui.startLoading(false) // First we put the loading spinner aside User PP
        .then(this.komunikator.get.bind(this.komunikator, 'playlist/getUserPlaylists/')) // Get user collection from server
        .then(collection => {
          return this.model.initCollection(collection); // Store them in the model so any library views can be built
        })
        .then(this.ui.stopLoading.bind(this.ui, false)) // We then stop the loading spinner
        .then(resolve)
        .catch(errorKey => {
          this.ui.stopLoading(false); // Stop the spinner in case of failure too
          Logger.raise({
            code: errorKey,
            frontend: false
          });
          reject();
        });
    });
  }


  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  PLAYBACK METHODS  -------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name togglePlay
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Toggle the playback and update the user interface
   **/
  togglePlay() {
    if (!this.model.player.hasSource()) {
      this.changeTrack(this.ui.firstTrackId);
    } else {
      this.model.togglePlay()
        .then(() => {
          this.ui.togglePlay();
        });
    }
  }


  /**
   * @method
   * @name stopPlayback
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Stop the playback and update the user interface
   **/
  stopPlayback() {
    this.model.stopPlayback()
      .then(() => {
        this.ui.stopPlayback();
      });
  }



  /**
   * @method
   * @name changeTrack
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Change the played track with the gievn one (using its ID)
   * @param {number} id - The track ID to request to the server
   * @param {boolean} centerOn - Force reframe on target track
   * @param {boolean} centerOn - Force reframe on target track
   **/
  changeTrack(id, centerOn = this.user.getPreference('lock-center-on-track')) {
    if (id !== -1) {
      this.model.changeTrack(id, `track/get/${id}/`)
        .then(() => {
          this.ui.changeTrack(this.model.playingTrack);

          if (centerOn === true) {
            this.ui.activeView.centerOn({
              id: id
            });
          }
        });
    }

    // Ci-gît ce petit banc de test, pour le lulz uniquement
    //.then(url => { return this.model.changeTrack('http://static.kevvv.in/sounds/callmemaybe.mp3') })
  }


  /**
   * @method
   * @name repeatTrack
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since November 2018
   * @description Repeat the current track loaded in the player
   **/
  repeatTrack() {
    this.model.repeatTrack();
    // No need to update the ui since the current track didn't changed
  }


  /**
   * @method
   * @name toggleRepeatMode
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Change the repeat state to the next one (off, one, all)
   **/
  toggleRepeatMode() {
    this.model.toggleRepeatMode()
      .then((repeatMode) => {
        this.ui.repeatMode = repeatMode;
      });
  }


  /**
   * @method
   * @name toggleShuffleMode
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Change the shuffle state to the next one (off, one, all)
   **/
  toggleShuffleMode() {
    this.model.toggleShuffleMode()
      .then((shuffleMode) => {
        this.ui.shuffleMode = shuffleMode;
      });
  }


  /**
   * @method
   * @name trackEnded
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Triggered when the player reached the end of a track **/
  trackEnded() {
    mzk.next();
  }


  /**
   * @method
   * @name setPlaybackRate
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since April 2019
   * @description Alter the player's playback rate
   * @param {number} value - The playback rate value to set in range float[0.25, 2] **/
  setPlaybackRate(value) {
    this.model.player.setPlaybackRate(value)
      .then(playbackRate => {
        this.ui.footBar.updatePlaybackRate(playbackRate);
      });
  }


  //  ------------------------------------------------------------------------------------------------//
  //  --------------------------------------  VOLUME METHODS  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name mute
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Mute the player
   **/
  mute() {
    this.model.mute();
    this.ui.updateVolume();
  }


  /**
   * @method
   * @name unmute
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Un Mute the player
   **/
  unmute() {
    this.model.unmute();
    this.ui.updateVolume();
  }


  /**
   * @method
   * @name toggleMute
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Toggle the player's mute state and update the user interface
   **/
  toggleMute() {
    this.model.toggleMute()
      .then(() => {
        this.ui.updateVolume();
      });
  }


  /**
   * @method
   * @name adjustVolume
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Add/Substract a given amount of volume, in range float[-1, 1] and update the user interface
   * @param {number} amount - The percentage amount to progress in the playback in range float[-1, 1]
   **/
  adjustVolume(amount) {
    this.model.adjustVolume(amount)
      .then(() => {
        this.ui.updateVolume();
      });
  }


  /**
   * @method
   * @name setVolume
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Add/Substract a given amount of volume, in range float[0, 1] and update the user interface
   * @param {number} volume - The volume value to set in range float[0, 1]
   **/
  setVolume(volume) {
    this.model.setVolume(volume)
      .then(() => {
        this.ui.updateVolume();
      });
  }

  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  PROGRESS METHODS  -------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name adjustProgress
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Adjust the progress percentage from a given amoun in range float[-100,100] and update the user interface
   * @param {number} amount - The percentage amount to progress in the playback in range float[-100, 100]
   **/
  adjustProgress(amount) {
    this.model.adjustProgress(amount)
      .then(() => {
        this.ui.updateProgress();
      });
  }


  /**
   * @method
   * @name setProgress
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Set the progress percentage in range float[0,100] and update the user interface
   * @param {number} progress - The percentage progress value to set in range float[0, 100]
   **/
  setProgress(progress) {
    this.model.setProgress(progress)
      .then(() => {
        this.ui.updateProgress();
      });
  }


  //  ------------------------------------------------------------------------------------------------//
  //  ------------------------------------  SCENE VIEW METHODS  ------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name changeActiveLibraryView
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since November 2018
   * @description Set a new active ui to the active playlist (available in LibraryViews mode)
   * @param {string} newView - The new ui string value in the global ViewEnum
   **/
  changeActiveLibraryView(newView) {
    return new Promise(resolve => {
      // Only changing ui if the new ui is not the current one
      if (this.model.activeView !== newView) {
        this.model.setActiveView(newView)
          .then(() => {
            this.ui.setSceneView({
              playlist: this.model.collection.activePlaylist
            });
            Events.register({
              name: 'SceneViewReady',
              oneShot: true
            }, resolve);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        resolve();
      }
    });
  }


  /**
   * @method
   * @name next
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Change the player track using the next one in the current ui
   * isUserRequest -> user has clicked on next
   **/
  next(isUserRequest) {
    if (this.model.queue.length > 0) {
      this.changeTrack(this.model.getNextFromQueue());
      this.ui.updateQueueNumber(this.model.queue);
      return;
    }

    const repeatMode = this.model.repeatMode;
    const shuffleMode = this.model.shuffleMode;

    if (shuffleMode === PlaybackModeEnum.NORMAL) {
      if (repeatMode === RepeatModeEnum.NO_REPEAT) {
        if (this.ui.isLastTrack()) {
          this.stopPlayback();
        } else {
          this.changeTrack(this.ui.nextTrackId);
        }
      } else if (repeatMode === RepeatModeEnum.REPEAT_TRACK) {
        this.repeatTrack();
      } else if (repeatMode === RepeatModeEnum.REPEAT_VIEW) {
        this.changeTrack(this.ui.nextTrackId);
      } else {
        Logger.raise({
          code: 'NO_NEXT_TRACK',
          frontend: true
        });
      }
    } else if (shuffleMode === PlaybackModeEnum.SHUFFLE) { // Shuffle
      // Spec is shuffle if user play next, normal playback in album otherwise, only if current is not the last track of album
      if (isUserRequest === true || this.model.isLastAlbumTrack(this.model.playingTrack.id)) {
        mzk.playShuffleTrackInPlaylist();
      } else {
        this.changeTrack(this.ui.nextTrackId);
      }
    } else if (shuffleMode === PlaybackModeEnum.RANDOM) { // Random
      mzk.playRandomTrackInPlaylist();
    } else {
      Logger.raise({
        code: 'INVALID_SHUFFLE_MODE',
        frontend: true
      });
    }
  }


  /**
   * @method
   * @name previousTrackInView
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Change the player track using the previous one in the current ui
   **/
  previousTrackInView() {
    const repeatMode = this.model.repeatMode;

    if (repeatMode === RepeatModeEnum.NO_REPEAT) {
      if (this.ui.isFirstTrack()) {
        this.stopPlayback();
      } else {
        this.changeTrack(this.ui.previousTrackId);
      }
    } else if (repeatMode === RepeatModeEnum.REPEAT_TRACK) {
      mzk.repeatTrack();
    } else if (repeatMode === RepeatModeEnum.REPEAT_VIEW) {
      this.changeTrack(this.ui.previousTrackId);
    } else {
      Logger.raise({
        code: 'NO_NEXT_TRACK',
        frontend: true
      });
    }
  }


  playRandomTrackInPlaylist() {
    this._playRandomizedTrack('random');
  }


  playShuffleTrackInPlaylist() {
    this._playRandomizedTrack('shuffle');
  }


  // Verb is shuffle or random only
  _playRandomizedTrack(verb) {
    if (verb !== 'shuffle' && verb !== 'random') {
      return;
    }

    const options = {
      PLAYLIST_ID: this.model.id
    };

    this.komunikator.post(`track/${verb}/`, options)
      .then(response => {
        if (response.DONE) {
          this.changeTrack(response.TRACK_ID);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  //  ------------------------------------------------------------------------------------------------//
  //  --------------------------------------  QUEUE METHODS  ---------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name addTrackToQueue
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Change the player track using the previous one in the current ui
   * @param {string} datasetId - The track dataset id (DOM dataset id) to append to the queue
   **/
  addTrackToQueue(datasetId) {
    const addTrack = (id) => {
      const track = this.ui.getTrackById(id);

      if (track) {
        this.model.appendToQueue(track.id);
        this.ui.updateQueueNumber(this.model.queue);
      }
    };

    const selection = this.ui.activeView.selection;
    // User has no selection : we simply adds the datasetId to the queue
    if (selection.length === 0) {
      addTrack(datasetId);
    } else {
      // When right clicked outside of the current selection : add the track the user was pointing
      if (selection.indexOf(Number(datasetId)) === -1) {
        addTrack(datasetId);
      } else { // When right clicked over the current selection : append the user selection in the queue
        //selection.push(datasetId);
        // Parsing selection to append track in the proper order
        for (let i = 0; i < selection.length; ++i) {
          addTrack(selection[i]);
        }
      }
    }
  }


  setQueueFromArray(queue) {
    this.model.setQueueFromArray(queue)
      .then(queuedTracks => {
        this.ui.updateQueuedTracks(queuedTracks);
      });
  }


  //  ------------------------------------------------------------------------------------------------//
  //  ------------------------------------  APP ACTION METHODS  ------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name download
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since January 2019
   * @description Serve the user a download of the current selection in the active ui. If no selection, it serve the right-clicked track
   * @param {string} id - The track dataset id (DOM dataset id) that triggered the context (see <code>if</code> condition)
   **/
  download(id) {
    const selection = this.ui.activeView.selection;
    const ids = [];

    if (selection.length === 0) { // User has no selection, so the downloaded track is the one the track context has been clicked on
      ids.push(this.ui.getTrackById(id).id);
    } else { // Fill the ids array with user selection
      for (let i = 0; i < selection.length; ++i) {
        ids.push(this.ui.getTrackById(selection[i]).id);
      }
    }

    const options = {
      TRACKS_ID: ids
    };

    this.komunikator.post('track/multiDownload/', options)
      .then(response => {
        if (response.DONE) {
          // Creating a fictive button
          const button = document.createElement('A');
          // Set the href path
          button.href = response.DOWNLOAD_PATH;
          // Regex to only keep the filename for the download content
          button.download = response.DOWNLOAD_PATH.replace(/^.*[\\\/]/, '');
          // DOM interaction (append, click and remove)
          document.body.appendChild(button);
          button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          document.body.removeChild(button);
        } else {
          console.log(response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  tapBpmForId(id) {
    new TapBpmModal({
      url: 'modal/tapBpm',
      trackId: id
    });
  }


  /**
   * @method
   * @name logOut
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since November 2018
   * @description Log out the user from server and reload location
   **/
  logOut() {
    this.komunikator.getBinaryResponse('logout/')
      .then(() => {
        location.reload();
      });
  }


  //  ------------------------------------------------------------------------------------------------//
  //  ------------------------------------  SHORTCUTS METHODS  -------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name reloadShortcuts
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Clear registered shortcuts and reload them all from User preferences, when they'll be a thing
   **/
  reloadShortcuts() {
    Shortcut.unregisterAll();

    // Multi keys shortcuts must be declared before simple ones, to respect the trigger order

    // Volume control
    Shortcut.register('Ctrl+Shift+ArrowDown', () => {
      this.adjustVolume(-VolumeControllerEnum.HUGE);
    });

    Shortcut.register('Ctrl+Shift+ArrowUp', () => {
      this.adjustVolume(VolumeControllerEnum.HUGE);
    });

    Shortcut.register('Ctrl+ArrowDown', () => {
      this.adjustVolume(-VolumeControllerEnum.BIG);
    });

    Shortcut.register('Ctrl+ArrowUp', () => {
      this.adjustVolume(VolumeControllerEnum.BIG);
    });

    Shortcut.register('ArrowDown', () => {
      this.adjustVolume(-VolumeControllerEnum.SMALL);
    });

    Shortcut.register('ArrowUp', () => {
      this.adjustVolume(VolumeControllerEnum.SMALL);
    });

    // Progress control
    Shortcut.register('Ctrl+Shift+ArrowLeft', () => {
      this.adjustProgress(-ProgressControllerEnum.HUGE_JUMP);
    });

    Shortcut.register('Ctrl+Shift+ArrowRight', () => {
      this.adjustProgress(ProgressControllerEnum.HUGE_JUMP);
    });

    Shortcut.register('Ctrl+ArrowLeft', () => {
      this.adjustProgress(-ProgressControllerEnum.BIG_JUMP);
    });

    Shortcut.register('Ctrl+ArrowRight', () => {
      this.adjustProgress(ProgressControllerEnum.BIG_JUMP);
    });

    Shortcut.register('ArrowLeft', () => {
      this.adjustProgress(-ProgressControllerEnum.SMALL_JUMP);
    });

    Shortcut.register('ArrowRight', () => {
      this.adjustProgress(ProgressControllerEnum.SMALL_JUMP);
    });

    // Playback control
    Shortcut.register(' ', () => {
      this.togglePlay();
    });
  }


  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  GETTER / SETTER  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /** @public
   * @member {number} - The player current progress in percentage in range float[0, 100] */
  get playerProgress() {
    return this.model.player.progress; // Returns player percentage progress
  }


  /** @public
   * @member {number} - The playback volume value in range float[0, 1] */
  get playerVolume() {
    return this.model.player.volume;
  }


  /** @public
   * @member {boolean} - The player muted state */
  get playerMuted() {
    return this.model.player.muted;
  }


  /** @public
   * @member {boolean} - The player playing state */
  get playerPlaying() {
    return this.model.player.isPlaying;
  }



  /** @public
   * @member {boolean} - The player playback rate in range float[0.25, 2] */
  get playbackRate() {
    return this.model.player.playbackRate;
  }


}


export default Mzk;
