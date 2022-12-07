import ProgressControlEnum from '../utils/enum/ProgressControl.js';
import VolumeControlEnum from '../utils/enum/VolumeControl.js';
import Player from './Player.js';


class Controller {


  constructor() {
    this._player = null;
    this._playObject = null;
    this._queue = []; // User manual queue
    this._playingId = -1;
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
    Evts.subscribe('TrackEnded', this._trackEnded.bind(this));
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
        track = options.playObject.tracks[0];
      }

      this._player.changeTrack(`/play/${track.id}/`).then(() => {
        this._playingId = track.id;
        Evts.publish('ChangeTrack', {
          id: track.id
        });
        resolve(track);
      }).catch(reject);
    });
  }


  _trackEnded() {
    // First, we check user manual queue that override everything
    if (this._queue.length > 0) {
      mzk.changeTrack({
        id: this._queue[this._queue.length - 1].id,
        playObject: {
          type: 'queue',
          track: this._queue[this._queue.length - 1]
        }
      });
      this._queue.pop();
      return;
    }
    // Now check last playObject in memory for tracks to play
    if (this._playObject.tracks.length > 1) {
      const track = this._playObject.tracks.shift();
      mzk.changeTrack({
        id: track.id,
        playObject: this._playObject
      });
    } else {
      mzk.stopPlayback();
    }
  }


  togglePlay() {
    this._player.togglePlay();
  }


  stopPlayback() {
    this._player.stop();
    this._playingTrack = null;
    this._playingId = -1;
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


  next() {

  }


  queue(data) {
    if (data.type === 'track') {
      const track = mzk.ui.getTrackById(data.id);
      this._queue.push(track);
    }
  }


  download(options) {
    const link = document.createElement('A');
    link.download = options.name;
    link.href = `/play/${options.id}`;
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


}


export default Controller;