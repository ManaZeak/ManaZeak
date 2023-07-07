import ProgressControlEnum from '../utils/enum/ProgressControl.js';
import VolumeControlEnum from '../utils/enum/VolumeControl.js';
import PlayerRepeatModeEnum from '../utils/enum/PlayerRepeatMode.js';
import PlayerPlaybackModeEnum from '../utils/enum/PlayerPlaybackMode.js';
import Player from './Player.js';


class Controller {


  constructor() {
    this._player = null;
    this._playObject = null;
    this._repeatMode = PlayerRepeatModeEnum.NO_REPEAT; // 0 = off | 1 = one | 2 = all
    this._playbackMode = PlayerPlaybackModeEnum.NORMAL; // 0 = normal | 1 = shuffle | 2 = random
    this._queue = []; // User manual queue
    this._shuffleQueue = []; // Internal for shuffle mode only
    this._waitForShuffle = true; // Flag to know if shuffle queue needs to be inited when changeTrack called
    this._playingId = -1;
    this._trackHistory = [];
    this._init();
    this._events();
    this._shortcuts();
  }


  _init() {
    // Avoid re-init
    if (this._player) {
      return;
    }

    this._player = new Player();
  }


  _events() {
    Evts.subscribe('TrackEnded', this._playNext.bind(this));
  }


  _shortcuts() {
    // Multi keys shortcuts must be declared before simple ones, to respect the trigger order

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


  /* Player controls */


  changeTrack(options) {
    return new Promise((resolve, reject) => {
      let track = options.playObject.track;
      if (options.playObject.type !== 'queue') { // Don't erase playObject if track to change came from queue
        this._playObject = options.playObject;
        track = this._playObject.tracks[this._playObject.playingIdx];
        // Update shuffle queue with new playObject, only if shuffle queue empty (otherwise shuffle in progress)
        if (this._waitForShuffle === true && this._playbackMode === PlayerPlaybackModeEnum.SHUFFLE) {
          this._waitForShuffle = false;
          this.__initShuffleQueue();
        }
      }

      let startTimePercentage = -1;
      if (options.startTimePercentage) {
        startTimePercentage = options.startTimePercentage;
      }

      this._player.changeTrack(`/play/${track.id}/`, startTimePercentage).then(() => {
        this._addTrackHistory(options, track);
        this._playingId = track.id;
        Evts.publish('ChangeTrack', {
          id: track.id
        });
        resolve(track);
      }).catch(reject);
    });
  }


  // --- Play next internal logic 


  _playNext() {
    // Priority order : Queue > Shuffle > Repeat > PlayObject

    // First, we check user queue that overrides everything
    if (this._queue.length > 0) {
      this.__playNextFromQueue();
      return;
    }
    // Now check last playObject in memory for tracks to play
    if (this._playObject.tracks.length > 0) {
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
        // No track remaining in playObj, nor repeat mode enabled, stop playback.
        mzk.stopPlayback();
        return;
      }
      // Otherwise, play next from current playObject
      this.__playNextFromPlayObject();
      return;
    }
    // No track in playObj, stop playback.
    mzk.stopPlayback();
  }


  __playNextFromQueue() {
    mzk.changeTrack({
      id: this._queue[0].id,
      playObject: {
        type: 'queue',
        track: this._queue[0]
      }
    });
    this._queue.shift();
  }


  __playNextFromShuffle() {
    // reached the end of shuffle internal queue
    if (!this._shuffleQueue.length) {
      if (this._repeatMode === PlayerRepeatModeEnum.REPEAT_ALL) {
        this._waitForShuffle = false;
        this.__initShuffleQueue();
        // Force repush, otherwise playingIdx would be missing from infinte shuffle
        this._shuffleQueue.push(this._playObject.playingIdx);
        this.__playNextFromShuffle();
        return;
      }

      this._waitForShuffle = true;
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


  __playNextFromRandom() {
    // Only draw a rand number in 0-x range for current playObject
    this._playObject.playingIdx = Math.floor(Math.random() * this._playObject.tracks.length);
    mzk.changeTrack({
      id: this._playObject.tracks[this._playObject.playingIdx].id,
      playObject: this._playObject
    });
  }


  __playNextFromRepeatOne() {
    mzk.changeTrack({
      id: this._playObject.tracks[this._playObject.playingIdx].id,
      playObject: this._playObject
    });
  }


  __playNextFromRepeatAll() {
    // Simply restart index to 0 in playObj
    this._playObject.playingIdx = 0;
    mzk.changeTrack({
      id: this._playObject.tracks[this._playObject.playingIdx].id,
      playObject: this._playObject
    });
  }


  __playNextFromPlayObject() {
    // Getting next track in playObj
    this._playObject.playingIdx = (this._playObject.playingIdx + 1) % this._playObject.tracks.length;
    mzk.changeTrack({
      id: this._playObject.tracks[this._playObject.playingIdx].id,
      playObject: this._playObject
    });
  }


  __initShuffleQueue() {
    this._shuffleQueue = Array.from(Array(this._playObject.tracks.length).keys());
    // Must remove straight ahead track being played from shuffle if any
    if (this._playObject) {
      this._shuffleQueue.splice(this._playObject.playingIdx, 1);
    } else {
      this._waitForShuffle = true;
    }
  }


  // -----


  _addTrackHistory(options, track) {
    // Test if track history already exists
    if (this._trackHistory.length && track.id === this._trackHistory[this._trackHistory.length - 1].id) {
      // Don't add track if latest in history is it
      return;
    }

    this._trackHistory.push(JSON.parse(JSON.stringify(options)));    
  }


  togglePlay() {
    this._player.togglePlay();
  }


  stopPlayback() {
    this._player.stop();
    this._playingTrack = null;
    this._playingId = -1;
  }


  toggleRepeatMode() {
    this._repeatMode = (++this._repeatMode) % 3;
  }


  togglePlaybackMode() {
    this._playbackMode = (++this._playbackMode) % 3;    
    // When toggling on shuffle, reset shuffle queue
    if (this._playbackMode === PlayerPlaybackModeEnum.SHUFFLE && this._playObject?.tracks?.length) {
      this.__initShuffleQueue();
    } else { // Force shuffle queue reset
      this._shuffleQueue = [];
    }
  }


  mute() {
    this._player.mute();
  }


  unmute() {
    this._player.unmute();
  }


  toggleMute() {
    this._player.toggleMute();
  }


  adjustVolume(amount) {
    this._player.adjustVolume(amount);
  }


  setVolume(volume) {
    this._player.volume = volume;
  }


  adjustProgress(amount) {
    this._player.adjustProgress(amount);
  }


  setProgress(progress) {
    this._player.progress = progress;
  }


  previous() {
    if (this._trackHistory.length === 0) {
      mzk.stopPlayback();
      return;
    }

    let options = this._trackHistory.pop();
    let track = options.playObject.track;
    if (options.playObject.type !== 'queue') {
      track = options.playObject.tracks[0];
    }
    // Pop again if playing track is current one
    if (track.id === this.playingId) {
      options = this._trackHistory.pop();
      if (!options) {
        mzk.stopPlayback();
        return;
      }
    }

    mzk.changeTrack({
      id: track.id,
      playObject: options.playObject
    });
  }


  next() {
    this._playNext();
  }


  queue(data) {
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


  removeFromQueue(id) {
    for (let i = 0; i < this._queue.length; ++i) {
      if (this._queue[i].id === id) {
        this._queue.splice(i, 1);
        return;
      }
    }
  }


  clearQueueTracks() {
    this._queue = [];
  }


  download(options) {
    const link = document.createElement('A');
    link.download = options.name;
    link.href = `/play/${options.id}/`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  get player() {
    return this._player;
  }


  get queuedTracks() {
    return this._queue;
  }


  get playObject() {
    return this._playObject;
  }


  get playingId() {
    return this._playingId;
  }


  get repeatMode() {
    return this._repeatMode;
  }


  get playbackMode() {
    return this._playbackMode;
  }


}


export default Controller;
