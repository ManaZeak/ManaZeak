import ProgressControlEnum from '../utils/enum/ProgressControl.js';
import VolumeControlEnum from '../utils/enum/VolumeControl.js';
import Player from './Player.js';


class Controller {


  constructor() {
    this._player = null;
    this._playObject = null;
    this._repeatMode = 0; // 0 = off | 1 = one | 2 = all
    this._shuffleMode = 0; // 0 = off | 1 = shuffle | 2 = random
    this._queue = []; // User manual queue
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


  _playNext() {
    /* Queue > Shuffle > Repeat > PlayObject */
    // First, we check user manual queue that override everything
    if (this._queue.length > 0) {
      mzk.changeTrack({
        id: this._queue[0].id,
        playObject: {
          type: 'queue',
          track: this._queue[0]
        }
      });
      this._queue.shift();
      return;
    }
    // Now check last playObject in memory for tracks to play
    if (this._playObject.tracks.length > 0) {
      if (this._repeatMode === 1) { // Repet one
        mzk.changeTrack({
          id: this._playObject.tracks[this._playObject.playingIdx].id,
          playObject: this._playObject
        });
        return;
      } else if (this._playObject.playingIdx === (this._playObject.tracks.length - 1)) { // Last track in playObj ended playback
        if (this._repeatMode === 2) {
          this._playObject.playingIdx = 0;
          mzk.changeTrack({
            id: this._playObject.tracks[this._playObject.playingIdx].id,
            playObject: this._playObject
          });
          return;
        }
        mzk.stopPlayback();
        return;
      }
      // Getting next track in playObj
      this._playObject.playingIdx = (this._playObject.playingIdx + 1) % this._playObject.tracks.length;
      mzk.changeTrack({
        id: this._playObject.tracks[this._playObject.playingIdx].id,
        playObject: this._playObject
      });
      return;
    }

    mzk.stopPlayback();
  }


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


  toggleShuffleMode() {
    this._shuffleMode = (++this._shuffleMode) % 3;    
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


  get shuffleMode() {
    return this._shuffleMode;
  }


}


export default Controller;
