import Player from './Player.js';


class Controller {


  constructor() {
    this._player = null;
    this._playObject = null;
    this._queue = []; // User manual queue
    this._playingId = -1;
    this._init();
    this._events();
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


  /* Player controls */


  changeTrack(options) {
    if (options.playObject) { // Only replace current playObject if existing
      this._playObject = options.playObject;
    }
    this._player.changeTrack(`/play/${options.id}`);
    this._playingId = options.id;
    Evts.publish('ChangeTrack', {
      id: options.id
    });
  }


  _trackEnded() {
    // First, we check user manual queue that override everything
    if (this._queue.length > 0) {
      mzk.changeTrack({
        id: this._queue[this._queue.length - 1].id
      });
      this._queue.pop();
      return;
    }
    // Now check last playObject in memory for tracks to play
    if (this._playObject.tracks.length > 0) {
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
    this._queue.push(data);
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


  get playingId() {
    return this._playingId;
  }


}


export default Controller;