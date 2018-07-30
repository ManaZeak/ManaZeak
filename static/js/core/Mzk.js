import Model from '../model/Model.js'
import View from '../view/View.js'

class Mzk {

  constructor() {
    this.model = {};
    this.view = {};

    this._init();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  _init() {
    let that = this;
    this._initModel()
      .then(() => { return that._initView(); });
  }

  _initModel() {
    return new Promise(function (resolve) {
      this.model = new Model();
      resolve();
    }.bind(this));
  }

  _initView() {
    return new Promise(function (resolve) {
      this.view = new View();
      resolve();
    }.bind(this));
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  //  --------------------------------  PLAYBACK METHODS  ---------------------------------  //

  changeTrack(id) {
    // TODO : get Track from id via Komunikator
    this.model.changeTrack((id === 5) ? '../static/101 - 501 - Black and Blue.flac' : 'http://static.kevvv.in/sounds/callmemaybe.mp3')
      .then(function() { this.view.changeTrack(this.model.player.getIsPlaying()); }.bind(this));
  }

  togglePlay() {
    this.model.togglePlay()
      .then(function() { this.view.togglePlay(this.model.player.getIsPlaying()); }.bind(this));
  }

  stopPlayback() {
    this.model.stopPlayback()
      .then(function() { this.view.stopPlayback(this.model.player.hasSource()); }.bind(this));
  }

  //  --------------------------------  VOLUME METHODS  ---------------------------------  //

  mute() { this.model.mute(); }

  unmute() { this.model.unmute(); }

  toggleMute() {
    this.model.toggleMute()
      .then(function() { this.view.updateVolume(this.model.player.getIsMuted(), this.model.player.getVolume()); }.bind(this));
  }

  adjustVolume(amount) {
    this.model.adjustVolume(amount)
      .then(function() { this.view.updateVolume(this.model.player.getIsMuted(), this.model.player.getVolume()); }.bind(this));
  }

  setVolume(volume) {
    this.model.setVolume(volume)
      .then(function() { this.view.updateVolume(this.model.player.getIsMuted(), this.model.player.getVolume()); }.bind(this));
  }

  //  --------------------------------  PROGRESS METHODS  ---------------------------------  //

  getProgress() { return this.model.player.getProgress(); }

  adjustProgress(amount) {
    this.model.adjustProgress(amount)
      .then(function() { this.view.updateProgress(this.model.player.getProgress()); }.bind(this));
  }

  setProgress(progress) {
    this.model.setProgress(progress)
      .then(function() { this.view.updateProgress(this.model.player.getProgress()); }.bind(this));
  }

  trackEnded() {
    // TODO repeat value to get here
//    this.model.player.repeatTrack(); // Repeat one
// If repeat off ->  this.model.stopPlayback(); .then( this.view.restoreDefault();
  }

}

export default Mzk;
