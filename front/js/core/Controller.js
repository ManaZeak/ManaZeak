import ProgressControlEnum from '../utils/enum/ProgressControl.js';
import VolumeControlEnum from '../utils/enum/VolumeControl.js';
import PlayerRepeatModeEnum from '../utils/enum/PlayerRepeatMode.js';
import PlayerPlaybackModeEnum from '../utils/enum/PlayerPlaybackMode.js';
import Player from './Player.js';


class Controller {


  /**
   * @class
   * @constructor
   * @summary Abstract model controller for playback and player
   * @author Arthur Beaulieu
   * @since July 2023
   * @licence GPL-v3.0
   * @description
   * <blockquote>
   * The `Controller` holds the audio player, and encapsulates most of its methods to do additionnal
   * process. It also holds repeat and playback mode, queue and track history. Finally, it handle all
   * determination for either previous and next track depending on the current playback context.
   * </blockquote> **/
  constructor() {
    if (DEBUG) { console.log('new Controller() : called'); }
    /** @private
     * @member {object} - The audio player component */
    this._player = null;
    /** @private
     * @member {object} - The playObject gives context and all tracks arround the item currently playing */
    this._playObject = null;
    /** @private
     * @member {string} - The currently playing track ID */
    this._playingId = '-1';

    /** @private
     * @member {array} - Previously played tracks stored in history to be restored when user hit previous */
    this._trackHistory = [];
    /** @private
     * @member {array} - The user queue, must only contains IDs  */
    this._queue = [];
    /** @private
     * @member {array} - The shuffle queue is a virtual queue only enabled when playback mode is at shuffle (ie 1) */
    this._shuffleQueue = [];
    /** @private
     * @member {boolean} - Does the shuffle queue needs to be inited when `Controller` receives a new playObject? */
    this._waitForShuffleTracks = true;

    /** @private
     * @member {number} - The player repeat mode enabled. See PlayerRepeatModeEnum */
    this._repeatMode = PlayerRepeatModeEnum.NO_REPEAT; // 0 = off | 1 = one | 2 = all
    /** @private
     * @member {number} - The player playback mode enabled. See PlayerPlaybackModeEnum */
    this._playbackMode = PlayerPlaybackModeEnum.NORMAL; // 0 = normal | 1 = shuffle | 2 = random
    // Start the init sequence to make `Controller` ready to control (huehuehue)
    this._init();
    this._events();
    this._shortcuts();
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -----------------------------------------  Component initialization  -----------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _init
   * @private
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Initialize the `Controller` by creating its associated audio player.
   * </blockquote> **/
  _init() {
    if (DEBUG) { console.log('Controller._init : called'); }
    // Use case should never happen, as main controller is not meant to be instanciated several times
    if (this._player) {
      return;
    }

    this._player = new Player();
  }


  /** @method
   * @name _events
   * @private
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Make the `Controller` ready to react to events broadcasted through the global event channel.
   * </blockquote> **/
  _events() {
    if (DEBUG) { console.log('Controller._events : called'); }
    Evts.subscribe('TrackEnded', this.next.bind(this));
  }


  /** @method
   * @name _shortcuts
   * @private
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Register keyboard shortcuts to control the playback and player. Multi keys shortcuts must be declared before
   * simple ones, to respect the cascading trigger order.
   * </blockquote> **/
  _shortcuts() {
    if (DEBUG) { console.log('Controller._shortcuts : called'); }
    // Volume control
    Shortcut.register('Ctrl+Shift+ArrowDown', () => { mzk.adjustVolume(-VolumeControlEnum.HUGE); });
    Shortcut.register('Ctrl+Shift+ArrowUp', () => { mzk.adjustVolume(VolumeControlEnum.HUGE); });
    Shortcut.register('Ctrl+ArrowDown', () => { mzk.adjustVolume(-VolumeControlEnum.BIG); });
    Shortcut.register('Ctrl+ArrowUp', () => { mzk.adjustVolume(VolumeControlEnum.BIG); });
    Shortcut.register('ArrowDown', () => { mzk.adjustVolume(-VolumeControlEnum.SMALL); });
    Shortcut.register('ArrowUp', () => { mzk.adjustVolume(VolumeControlEnum.SMALL); });
    // Progress control
    Shortcut.register('Ctrl+Shift+ArrowLeft', () => { mzk.adjustProgress(-ProgressControlEnum.HUGE_JUMP); });
    Shortcut.register('Ctrl+Shift+ArrowRight', () => { mzk.adjustProgress(ProgressControlEnum.HUGE_JUMP); });
    Shortcut.register('Ctrl+ArrowLeft', () => { mzk.adjustProgress(-ProgressControlEnum.BIG_JUMP); });
    Shortcut.register('Ctrl+ArrowRight', () => { mzk.adjustProgress(ProgressControlEnum.BIG_JUMP); });
    Shortcut.register('ArrowLeft', () => { mzk.adjustProgress(-ProgressControlEnum.SMALL_JUMP); });
    Shortcut.register('ArrowRight', () => { mzk.adjustProgress(ProgressControlEnum.SMALL_JUMP); });
    // Playback control
    Shortcut.register(' ', () => { mzk.togglePlay(); });
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -------------------------------------  Playback and progress management  -------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name togglePlay
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since November 2023
   * @description <blockquote>
   * Toggles the player's playback state between playing/paused.
   * </blockquote> **/
   setPlay(state) {
    if (DEBUG) { console.log('Controller.setPlay : called with', state); }
    return new Promise(resolve => {
      if (state === true) {
        this._player.play().then(resolve);
      } else {
        this._player.pause();
        resolve();
      }
    });
  }


  /** @method
   * @name togglePlay
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Toggles the player's playback state between playing/paused.
   * </blockquote> **/
  togglePlay() {
    return new Promise(resolve => {
      if (DEBUG) { console.log('Controller.togglePlay : called'); }
      this._player.togglePlay().then(resolve);
    });
  }


  /** @method
   * @name stopPlayback
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Stops the player's playback and reset playing track internal information.
   * </blockquote> **/
  stopPlayback() {
    if (DEBUG) { console.log('Controller.stopPlayback : called'); }
    this._player.stop();
    this._playingTrack = null;
    this._playingId = -1;
  }


  /** @method
   * @name adjustProgress
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Adjust the player's progress from a specific amount of time in seconds, whether positive or negative. 
   * </blockquote> 
   * @param {number} amount - The amount of second to adjust player's progress with in seconds **/
  adjustProgress(amount) {
    if (DEBUG) { console.log('Controller.adjustProgress : called with (amount)', amount); }
    this._player.adjustProgress(amount);
  }


  /** @method
   * @name setProgress
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Set the player's current time with a percentage value in range [0,100].
   * </blockquote>
   * @param {number} progress - The percentage to set the player's progress with **/
  setProgress(progress) {
    if (DEBUG) { console.log('Controller.setProgress : called with (progress)', progress); }
    this._player.progress = progress;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -----------------------------------------  Player volume management  -----------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name mute
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Mute the player's volume.
   * </blockquote> **/
  mute() {
    if (DEBUG) { console.log('Controller.mute : called'); }
    this._player.mute();
  }


  /** @method
   * @name unmute
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Restore the volume at its before-mute state.
   * </blockquote> **/
  unmute() {
    if (DEBUG) { console.log('Controller.unmute : called'); }
    this._player.unmute();
  }


  /** @method
   * @name toggleMute
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Toggles the player's volume state between mute/unmute.
   * </blockquote> **/
  toggleMute() {
    if (DEBUG) { console.log('Controller.toggleMute : called'); }
    this._player.toggleMute();
  }


  /** @method
   * @name adjustVolume
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Adjust the player's volume from a specific amount in range [-1, 1], whether positive or negative. 
   * </blockquote> 
   * @param {number} amount - The percentage to adjust player's volume with **/
  adjustVolume(amount) {
    if (DEBUG) { console.log('Controller.adjustVolume : called with (amount)', amount); }
    this._player.adjustVolume(amount);
  }


  /** @method
   * @name setVolume
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Set the player's volume with a percentage value in range [0, 1].
   * </blockquote>
   * @param {number} volume - The percentage to set the player's volume with **/
  setVolume(volume) {
    if (DEBUG) { console.log('Controller.setVolume : called with (volume)', volume); }
    this._player.volume = volume;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  --------------------------------  Track update and next track determination  ---------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name changeTrack
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Change the player current track. Updates `playObject`, eventually init shuffle, perform the track
   * update in `Player` then update track history before dispatching the `ChangeTrack` global event.
   * </blockquote>
   * @param {object} data - Options to take into account while changing track
   * @param {object} data.playObject - The current playObject used for playback
   * @param {string} data.playObject.type - The playObject type in `['queue', 'album', 'genre']`
   * @param {object} data.playObject.track - The playObject track currently selected (to use for 'queue' only)
   * @param {array} data.playObject.tracks - The playObject tracks (to use for 'album' and 'genre')
   * @param {number} data.playObject.playingIdx - The playing track index in tracks (to use for 'album' and 'genre')
   * @param {number} [data.startTimePercentage=null] - The progress percentage to start playback with 
   * @returns {promise} Resolved when track updated with playing track as argument, rejected otherwise **/
  changeTrack(data) {
    if (DEBUG) { console.log('Controller.changeTrack : called with (data)', data); }
    return new Promise((resolve, reject) => {
      let track = data.playObject.track;
      // Only replace playObject if track to change didn't came from queue
      if (data.playObject.type !== 'queue') {
        this._playObject = data.playObject;
        track = this._playObject.tracks[this._playObject.playingIdx];
        // Update shuffle queue with new playObject, only if shuffle queue empty (otherwise shuffle in progress)
        if (this._waitForShuffleTracks === true && this._playbackMode === PlayerPlaybackModeEnum.SHUFFLE) {
          this._waitForShuffleTracks = false; // New playObject, not waiting for tracks to shuffle anymore
          this._initShuffleQueue();
        }
      }
      // Request a track change on pPlayer with track information
      this._player.changeTrack(`/play/${track.id}/`, data.startTimePercentage).then(() => {
        this._addTrackHistory(data.playObject, track); // Update track history for previous feature
        this._playingId = track.id; // Store playing track ID
        // Dispatch global event for components to react
        Evts.publish('ChangeTrack', {
          id: track.id
        });
        // Resolve to caller with playing track
        resolve(track);
      }).catch(reject);
    });
  }


  /** @method
   * @name next
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Request for next track. Seek for queue first, for playback mode, then for repeat mode and finally from `playObject`
   * in natural order.
   * </blockquote> **/
  next() {
    if (DEBUG) { console.log('Controller.next : called'); }
    this._playNext();
  }


  /** @method
   * @name _playNext
   * @private
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Callback method for global event `TrackEnded` (published by `Player`) to smoothly select the following track
   * to play, depending on the user queue, playback mode, repeat mode and playObject in memory (presented here
   * in its priority order). 
   * </blockquote> **/
  _playNext() {
    if (DEBUG) { console.log('Controller._playNext : called'); }
    // Priority order : Queue > Shuffle > Repeat > PlayObject

    // First, we check user queue that overrides everything
    if (this._queue.length > 0) {
      this.__playNextFromQueue();
      return;
    }
    // Now check last playObject in memory for tracks to play
    if (this._playObject?.tracks.length > 0) {
      // Then checking shuffle and random modes
      if (this._playbackMode === PlayerPlaybackModeEnum.SHUFFLE) {
        this.__playNextFromShuffle();
        return;
      } else if (this._playbackMode === PlayerPlaybackModeEnum.RANDOM) {
        this.__playNextFromRandom();
        return;
      }
      // Followed by repeat mode inspection
      if (this._repeatMode === PlayerRepeatModeEnum.REPEAT_ONE) { // Repet one
        this.__playNextFromRepeatOne();
        return;
      } else if (this._playObject.playingIdx === (this._playObject.tracks.length - 1)) { // Last track in playObj reached
        if (this._repeatMode === PlayerRepeatModeEnum.REPEAT_ALL) { // Repeat all
          this.__playNextFromRepeatAll();
          return;
        }
        // Try to play next track from view
        this.__playNextFromView();
        return;
      }
      // Otherwise, play next from current playObject
      this.__playNextFromPlayObject();
      return;
    }
    // No track in playObj, stop playback.
    mzk.stopPlayback();
  }


  /** @method
   * @name __playNextFromQueue
   * @private
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Internal method for `_playNext()`, used to set next track to play from queue.
   * </blockquote> **/
  __playNextFromQueue() {
    if (DEBUG) { console.log('Controller.__playNextFromQueue : called'); }
    mzk.changeTrack({
      id: this._queue[0].id,
      playObject: {
        type: 'queue',
        track: this._queue[0]
      }
    });
    // Shifting queue to properly end transaction
    this._queue.shift();
  }


  /** @method
   * @name __playNextFromShuffle
   * @private
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Internal method for `_playNext()`, used to set next track to play in `playObject` when
   * playback mode is`PlayerPlaybackModeEnum.SHUFFLE` (ie = 1).
   * </blockquote> **/
  __playNextFromShuffle() {
    if (DEBUG) { console.log('Controller.__playNextFromShuffle : called'); }
    // reached the end of shuffle internal queue
    if (!this._shuffleQueue.length) {
      if (this._repeatMode === PlayerRepeatModeEnum.REPEAT_ALL) {
        this._waitForShuffleTracks = false;
        this._initShuffleQueue();
        // Force repush, otherwise playingIdx would be missing from infinte shuffle
        this._shuffleQueue.push(this._playObject.playingIdx);
        this.__playNextFromShuffle();
        return;
      }

      this._waitForShuffleTracks = true;
      mzk.stopPlayback();
      return;
    }
    // Pick rand idx in shuffle queue, apply value to playObj and remove from shuffle queue
    const randIdx = Math.floor(Math.random() * this._shuffleQueue.length);
    this._playObject.playingIdx = this._shuffleQueue[randIdx];
    this._shuffleQueue.splice(randIdx, 1);
    mzk.changeTrack({
      id: this._playObject.tracks[this._playObject.playingIdx].id,
      playObject: this._playObject
    });

  }


  /** @method
   * @name __playNextFromRandom
   * @private
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Internal method for `_playNext()`, used to set next track to play in `playObject` when
   * playback mode is`PlayerPlaybackModeEnum.RANDOM` (ie = 2). As it takes a random item in
   * the playObject, the playback is infinite as if user is in `PlayerRepeatModeEnum.REPEAT_ALL`.
   * </blockquote> **/
  __playNextFromRandom() {
    if (DEBUG) { console.log('Controller.__playNextFromRandom : called'); }
    // Only draw a rand number in 0-x range for current playObject
    this._playObject.playingIdx = Math.floor(Math.random() * this._playObject.tracks.length);
    mzk.changeTrack({
      id: this._playObject.tracks[this._playObject.playingIdx].id,
      playObject: this._playObject
    });
  }


  /** @method
   * @name __playNextFromRepeatOne
   * @private
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Internal method for `_playNext()`, used to set next track to play in `playObject` when
   * repeat mode is `PlayerRepeatModeEnum.REPEAT_ONE` (ie = 1). Simply play again current track.
   * </blockquote> **/
  __playNextFromRepeatOne() {
    if (DEBUG) { console.log('Controller.__playNextFromRepeatOne : called'); }
    mzk.changeTrack({
      id: this._playObject.tracks[this._playObject.playingIdx].id,
      playObject: this._playObject
    });
  }


  /** @method
   * @name __playNextFromRepeatAll
   * @private
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Internal method for `_playNext()`, used to set next track to play in `playObject` when
   * repeat mode is `PlayerRepeatModeEnum.REPEAT_ALL` (ie = 2). Start playback a tracks index 0.
   * </blockquote> **/
  __playNextFromRepeatAll() {
    if (DEBUG) { console.log('Controller.__playNextFromRepeatAll : called'); }
    // Simply restart index to 0 in playObj
    this._playObject.playingIdx = 0;
    mzk.changeTrack({
      id: this._playObject.tracks[this._playObject.playingIdx].id,
      playObject: this._playObject
    });
  }


  /** @method
   * @name __playNextFromPlayObject
   * @private
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Internal method for `_playNext()`, used to set next track to play in `playObject`.
   * </blockquote> **/
  __playNextFromPlayObject() {
    if (DEBUG) { console.log('Controller.__playNextFromPlayObject : called'); }
    // Getting next track in playObj
    this._playObject.playingIdx = (this._playObject.playingIdx + 1) % this._playObject.tracks.length;
    mzk.changeTrack({
      id: this._playObject.tracks[this._playObject.playingIdx].id,
      playObject: this._playObject
    });
  }


  /** @method
   * @name __playNextFromView
   * @private
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Internal method for `_playNext()`, used to try to get a track to play from current view.
   * </blockquote> **/
  __playNextFromView() {
    if (DEBUG) { console.log('Controller.__playNextFromView : called'); }
    const currentView = mzk.ui.getCurrentView();
    if (currentView.id === this._playObject.id) {
      // Do not replay playObj if user is on the same view
      mzk.stopPlayback();
      return;
    }

    if (typeof currentView.playFirstTrack === 'function') {
      // No track remaining in playObj, nor repeat mode enabled, stop playback.
      currentView.playFirstTrack();
    } else {
      mzk.stopPlayback();
    }
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------  Track history and previous feature  ------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name previous
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Request for previous track. Seek for history first, for `playObject` then and stop playback otherwise.
   * </blockquote> **/
  previous() {
    if (DEBUG) { console.log('Controller.previous : called'); }
    // No history, check playObject to get previous in view. Stop playback otherwise
    if (this._trackHistory.length <= 1) {
      // Ensure history is cleaned
      if (this._trackHistory.length === 1) {
        this._trackHistory.pop();
      }
      // Seek for previous track to play in playObject 
      if (this._playObject?.playingIdx > 0) {
        this._playObject.playingIdx -= 1;
        mzk.changeTrack({
          id: this._playObject.tracks[this._playObject.playingIdx].id,
          playObject: this._playObject
        });
        return;
      }
      // Kill playback otherwise
      mzk.stopPlayback();
      return;
    }
    // Getting playObject from history
    let playObject = this._trackHistory.pop();
    if (playObject.tracks[playObject.playingIdx].id === this.playingId) {
      playObject = this._trackHistory.pop();
    }
    // Extract track from history entry
    let track = playObject.track; // Assuming default playObject type is from queue
    // Handle other playable view ('album' or 'genre')
    if (playObject.type !== 'queue') {
      track = playObject.tracks[playObject.playingIdx];
    }
    // Now apply new track to play
    mzk.changeTrack({
      id: track.id,
      playObject: playObject
    });
  }


  /** @method
   * @name _addTrackHistory
   * @private
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Save a track into the track history so it can be used with the previous feature.
   * </blockquote>
   * @param {object} playObject - The track associated playObject
   * @param {string} playObject.type - The playObject type in `['queue', 'album', 'genre']`
   * @param {object} playObject.track - The playObject track currently selected (to use for 'queue' only)
   * @param {array} playObject.tracks - The playObject tracks (to use for 'album' and 'genre')
   * @param {number} playObject.playingIdx - The playing track index in tracks (to use for 'album' and 'genre')
   * @param {object} track - The track to save in history
   * @param {string} track.id - The track unique ID
   * @param {string} track.title - The track title
   * @param {string} track.artist - The track artist
   * @param {string} track.duration - The track duration in HH:MM:SS or MM:SS
   * @param {string} track.cover - The track cover path
   * @param {string} track.mood - The track moodbar image filename **/
  _addTrackHistory(playObject, track) {
    if (DEBUG) { console.log('Controller._addTrackHistory : called with (playObject, track)', playObject, track); }
    // Don't add track if latest track in history is current one
    if (this._trackHistory.length && track.id === this._trackHistory[this._trackHistory.length - 1].id) {
      return;
    }
    // Sanitize and push playObject into history
    this._trackHistory.push(JSON.parse(JSON.stringify(playObject)));
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  --------------------------------  Repeat/Playback, queue and shuffle methods  --------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name toggleRepeatMode
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Updates the repeat mode to it's following state in [0, 1, 2]. Please see PlayerRepeatModeEnum.
   * </blockquote> **/
  toggleRepeatMode() {
    if (DEBUG) { console.log('Controller.toggleRepeatMode : called'); }
    this._repeatMode = (++this._repeatMode) % 3;
  }


  /** @method
   * @name togglePlaybackMode
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Updates the playback mode to it's following state in [0, 1, 2]. Please see PlayerPlaybackModeEnum. If user
   * is switching to shuffle mode (which value is 1), it will init the shuffle queue with the current playObject
   * tracks if any.
   * </blockquote> **/
   togglePlaybackMode() {
    if (DEBUG) { console.log('Controller.togglePlaybackMode : called'); }
    this._playbackMode = (++this._playbackMode) % 3;    
    // When toggling on shuffle, reset shuffle queue
    if (this._playbackMode === PlayerPlaybackModeEnum.SHUFFLE && this._playObject?.tracks?.length) {
      this._initShuffleQueue();
    } else { // Force shuffle queue reset
      this._shuffleQueue = [];
    }
  }


  /** @method
   * @name queue
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Append a new element in the user queue. Queue overrides current repeat/playback mode.
   * Individual track or trackset can be appended at once into the queue.
   * </blockquote>
   * @param {object} data - The object to queue (wether a track or a set of tracks)
   * @param {string} data.type - The object to add type, in `['track', 'tracklist']`
   * @param {string} data.id - Only relevant in `type === 'track`, the track ID to store in queue
   * @param {array} data.ids - Only relevant in `type === 'tracklist'`, the track IDs to stored in queue **/
  queue(data) {
    if (DEBUG) { console.log('Controller.queue : called with (data)', data); }
    if (data.type === 'track') {
      const track = mzk.ui.getTrackById(data.id);
      this._queue.push(track);
    } else if (data.type === 'tracklist') {
      for (let i = 0; i < data.ids.length; ++i) {
        const track = mzk.ui.getTrackById(data.ids[i]);
        this._queue.push(track);
      }
    }
  }


  /** @method
   * @name removeFromQueue
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Removes an individual track from the queue using its ID.
   * </blockquote>
   * @param {string} id - The track id to remove from queue **/
  removeFromQueue(id) {
    if (DEBUG) { console.log('Controller.removeFromQueue : called ith (id)', id); }
    for (let i = 0; i < this._queue.length; ++i) {
      if (this._queue[i].id === id) {
        this._queue.splice(i, 1);
        return;
      }
    }
  }


  /** @method
   * @name clearQueueTracks
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Clear the user queue and remove all its stored IDs.
   * </blockquote> **/
  clearQueueTracks() {
    if (DEBUG) { console.log('Controller.clearQueueTracks : called'); }
    this._queue = [];
  }


  /** @method
   * @name _initShuffleQueue
   * @private
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Initialize shuffle queue by copying indexes from `playObject.tracks`. This copied array will serve
   * to know which tracks has already been shuffled and played. In case no `playObject` is already saved, an
   * internal flag `_waitForShuffleTracks` is set to `true`, so when `changeTrack` is called, bringing a new
   * `playObject` to analyse, the queue is initialized again.
   * </blockquote> **/
  _initShuffleQueue() {
    if (DEBUG) { console.log('Controller._initShuffleQueue : called'); }
    // Fill array with indexes values ([0/0, 1/1, ..., len/len])
    this._shuffleQueue = Array.from(Array(this._playObject.tracks.length).keys());
    // Must remove straight ahead track being played from shuffle if any
    if (this._playObject) {
      this._shuffleQueue.splice(this._playObject.playingIdx, 1);
    } else {
      this._waitForShuffleTracks = true; // Otherwise we need to wait for a call in changeTrack to get a playObject
    }
  }


  /** @method
   * @name download
   * @public
   * @memberof Controller
   * @author Arthur Beaulieu
   * @since July 2023
   * @description <blockquote>
   * Download a given audio file, using its ID. Creates a virtual href and serve the user a file to download.
   * </blockquote>
   * @param {object} data - The download data to properly fetch and create output file.
   * @param {string} data.name - The output filename
   * @param {string} data.id - The track ID to download **/
  download(data) {
    if (DEBUG) { console.log('Controller.download : called with (data)', data); }
    const link = document.createElement('A');
    link.download = data.name;
    link.href = `/play/${data.id}/`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ----------------------------------------  Controller exposed getters  ----------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @public
   * @member {object} - The audio player component public accessor */
  get player() {
    return this._player;
  }


  /** @public
   * @member {object} - The queue content public accessor */
  get queuedTracks() {
    return this._queue;
  }


  /** @public
   * @member {object} - The current playObject public accessor */
  get playObject() {
    return this._playObject;
  }


  /** @public
   * @member {string} - The track playing ID public accessor */
  get playingId() {
    return this._playingId;
  }


  /** @public
   * @member {number} - The player's repeat mode public accessor */
  get repeatMode() {
    return this._repeatMode;
  }


  /** @public
   * @member {number} - The player's playback mode public accessor */
  get playbackMode() {
    return this._playbackMode;
  }


}


export default Controller;
