import Komunikator from './Komunikator.js';
import Model from '../model/Model.js';
import UserInterface from '../view/UserInterface.js';
import User from './User.js';
import Notification from "../view/utils/Notification";
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
      .then(() => {
        return this._initLang();
      })
      .then(() => {
        return this._initUser();
      })
      .then(() => {
        return this._initUi();
      })
      .then(() => {
        return this._initModel();
      })
      .then(() => {
        return this._initShortcut();
      })
      .then(() => {
        return this._startApp();
      })
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
   * @description Init the lang keys and attach them to this
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
      this.komunikator.get('playlist/getUserPlaylists/')
        .then(collection => {
          this.model.initCollection(collection)
            .then(playlist => {
              this.startLoading(false)
                .then(() => {
                  this.ui.initPlaylist(playlist);
                  this.stopLoading(false);
                  resolve();
                });
            })
            .catch(errorKey => {
              Logger.raise({
                code: errorKey,
                frontend: false
              });
              reject();
            });
        })
        .catch(errorKey => {
          Logger.raise({
            code: errorKey,
            frontend: true
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
   **/
  changeTrack(id, centerOn = this.user.getPreference('lock-center-on-track')) {
    /*let durationPlayed = 0; // TODO migrate in websocket

    if (!isNaN(this.playerProgress)) {
      durationPlayed = this.playerProgress;
    }

    const options = {
      TRACK_ID: id,
      LAST_TRACK_PATH: this.model.player.getSource(),
      TRACK_PERCENTAGE: durationPlayed,
      PREVIOUS: false
    };*/
    this.model.changeTrack(id, `track/get/${id}/`)
      .then(() => {
        this.ui.changeTrack(this.model.playingTrack);

        if (centerOn === true) {
          this.ui.activeView.centerOn({
            id: id
          });
        }
      });

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
    // No need to update the view since the current track didn't changed
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


  startLoading(lockView) {
    return new Promise(resolve => {
      this.ui.startLoading(lockView)
        .then(() => {
          return requestAnimationFrame(resolve);
        });
    });
  }


  stopLoading(lockView) {
    return new Promise(resolve => {
      this.ui.stopLoading(lockView);
      resolve();
    });
  }


  //  ------------------------------------------------------------------------------------------------//
  //  ------------------------------------  SCENE VIEW METHODS  ------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name changeActiveView
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since November 2018
   * @description Set a new active view to the active playlist
   * @param {string} newView - The new view string value in the global ViewEnum
   **/
  changeActiveView(newView) {
    return new Promise(resolve => {
      this.startLoading(true)
        .then(() => {
          return this.model.setActiveView(newView);
        })
        .then(() => {
          this.ui.updateView(this.model.collection.activePlaylist);
          this.stopLoading(true);
          resolve();
        })
        .catch(error => {
          console.log(error);
        });
    });
  }


  /**
   * @method
   * @name next
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Change the player track using the next one in the current view
   **/
  next() {
    if (this.model.queue.length > 0) {
      this.changeTrack(this.model.getNextFromQueue());
      this.ui.updateQueueNumber(this.model.queue);
      return;
    }

    const repeatMode = this.model.repeatMode;
    const shuffleMode = this.model.shuffleMode;

    if (shuffleMode === 0) {
      if (repeatMode === 0) {
        if (this.ui.isLastTrack()) {
          this.stopPlayback();
        } else {
          this.changeTrack(this.ui.nextTrackId);
        }
      } else if (repeatMode === 1) {
        this.repeatTrack();
      } else if (repeatMode === 2) {
        this.changeTrack(this.ui.nextTrackId);
      } else {
        Logger.raise({
          code: 'NO_NEXT_TRACK',
          frontend: true
        });
      }
    } else if (shuffleMode === 1) { // Shuffle
      mzk.playShuffleTrackInPlaylist();
    } else if (shuffleMode === 2) { // Random
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
   * @description Change the player track using the previous one in the current view
   **/
  previousTrackInView() {
    const repeatMode = this.model.repeatMode;

    if (repeatMode === 0) {
      if (this.ui.isFirstTrack()) {
        this.stopPlayback();
      } else {
        this.changeTrack(this.ui.previousTrackId);
      }
    } else if (repeatMode === 1) {
      mzk.repeatTrack();
    } else if (repeatMode === 2) {
      this.changeTrack(this.ui.previousTrackId);
    } else {
      Logger.raise({
        code: 'NO_NEXT_TRACK',
        frontend: true
      });
    }
  }


  playRandomTrackInPlaylist() {
    const options = {
      PLAYLIST_ID: this.model.id
    };

    this.komunikator.post('player/randomNext/', options)
      .then(response => {
        /* response = {
         *     DONE       : bool
         *     ERROR_H1   : string
         *     ERROR_MSG  : string
         *
         *     IS_LAST    : bool
         *     TRACK_ID   : int
         * } */
        if (response.DONE) {
          this.changeTrack(response.TRACK_ID);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  playShuffleTrackInPlaylist() {
    const options = {
      PLAYLIST_ID: this.model.id
    };

    this.komunikator.post('player/shuffleNext/', options)
      .then(response => {
        /* response = {
         *     DONE       : bool
         *     ERROR_H1   : string
         *     ERROR_MSG  : string
         *
         *     IS_LAST    : bool
         *     TRACK_ID   : int
         * } */
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
   * @description Change the player track using the previous one in the current view
   * @param {string} datasetId - The track dataset id (DOM dataset id) to append to the queue
   **/
  addTrackToQueue(datasetId) {
    const selection = this.ui.activeView.selection;
    // User has no selection : we simply adds the datasetId to the queue
    if (selection.length === 0) {
      const track = this.ui.getTrackById(datasetId);

      if (track) {
        this.model.appendToQueue(track.id);
        this.ui.updateQueueNumber(this.model.queue);
      }
    } else {
      // Checking if the datasetId isn't in selection, so we can append it to the selection array
      if (selection.indexOf(Number(datasetId)) === -1) {
        selection.push(datasetId);
      }
      // Parsing selection to append track in the proper order
      for (let i = 0; i < selection.length; ++i) {
        const track = this.ui.getTrackById(selection[i]);

        if (track) {
          this.model.appendToQueue(track.id);
        }
      }
      this.ui.updateQueueNumber(this.model.queue);
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
   * @description Serve the user a download of the current selection in the active view. If no selection, it serve the right-clicked track
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
        }
        else {
          console.log(response);
        }
      })
      .catch(error => {
        console.log(error);
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

    // Multi keys shortcuts must be declared before simple ones, to respect the trigger ordre

    // Volume control
    Shortcut.register('Ctrl+Shift+ArrowDown', () => {
      this.adjustVolume(-0.25);
    });

    Shortcut.register('Ctrl+Shift+ArrowUp', () => {
      this.adjustVolume(0.25);
    });

    Shortcut.register('Ctrl+ArrowDown', () => {
      this.adjustVolume(-0.1);
    });

    Shortcut.register('Ctrl+ArrowUp', () => {
      this.adjustVolume(0.1);
    });

    Shortcut.register('ArrowDown', () => {
      this.adjustVolume(-0.01);
    });

    Shortcut.register('ArrowUp', () => {
      this.adjustVolume(0.01);
    });

    // Progress control
    Shortcut.register('Ctrl+Shift+ArrowLeft', () => {
      this.adjustProgress(-25);
    });

    Shortcut.register('Ctrl+Shift+ArrowRight', () => {
      this.adjustProgress(25);
    });

    Shortcut.register('Ctrl+ArrowLeft', () => {
      this.adjustProgress(-10);
    });

    Shortcut.register('Ctrl+ArrowRight', () => {
      this.adjustProgress(10);
    });

    Shortcut.register('ArrowLeft', () => {
      this.adjustProgress(-1);
    });

    Shortcut.register('ArrowRight', () => {
      this.adjustProgress(1);
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
