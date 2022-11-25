import Player from './Player.js';


class Controller {


  constructor() {
    this._player = null;
    this._playObject = null;
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
    this._playObject = options.playObject;
    this._player.changeTrack(`/play/${options.id}`);
    Evts.publish('ChangeTrack', {
      id: options.id
    });
  }


  _trackEnded() {
    if (this._playObject.tracks.length > 0) {
      const track = this._playObject.tracks.shift();
      mzk.changeTrack({
        id: track.id,
        playObject: this._playObject
      })
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


}


export default Controller;