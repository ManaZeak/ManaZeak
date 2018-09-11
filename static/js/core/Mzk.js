import Model from '../model/Model.js'
import View from '../view/View.js'
import Komunikator from './Komunikator.js'
import User from './User.js'

class Mzk {

  constructor() {
    this.model = {};
    this.view = {};
    this.komunikator = {};

    this.cookies = {};
    this.lang = {}
    this.user = {};
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  _initKomunikator() {
    return new Promise(resolve => {
      this.komunikator = new Komunikator(this.cookies['csrftoken']);
      resolve();
    });
  }

  _initUser() {
    return new Promise(resolve => {
      this.user = new User();
      this.komunikator.get('user/getInformation/')
        .then(response => { this.user.updateProperties(response); resolve(); })
        //.catch(function(re) { console.log(re); }); // TODO : create Utils.handleResponseErrors to handle or Error.js singleton TODO
    });
  }

  _initModel() {
    return new Promise(resolve => {
      this.model = new Model();
      resolve();
    });
  }

  _initView() {
    return new Promise(resolve => {
      this.view = new View();
      resolve();
    });
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  init() {
    this.cookies = Utils.getCookies(); // Get user cookies

    Utils.getLangage(this.cookies['csrftoken'], (navigator.language || navigator.userLanguage)) // Fetch language keys/values to init View later
      .then(nls => { this.lang = nls; }) // Save langage in Mzk object
      .then(() => { return this._initKomunikator(); }) // Set Komunikator to handle backend comunication
      .then(() => { return this._initUser(); }) // Create User object that stores everything useful about a given user
      .then(() => { return this._initModel(); }) // Initialize mzk Model
      .then(() => { return this._initView(); }); // Initialize mzk View
  }

      //  --------------------------------  PLAYBACK METHODS  ---------------------------------  //

  changeTrack(id) {
    // TODO : get Track from id via Komunikator
    this.model.changeTrack((id === 5) ? '../static/101 - 501 - Black and Blue.flac' : 'http://static.kevvv.in/sounds/callmemaybe.mp3')
      .then(() => { this.view.changeTrack(this.model.player.getIsPlaying()); });
  }

  togglePlay() {
    this.model.togglePlay()
      .then(() => { this.view.togglePlay(this.model.player.getIsPlaying()); });
  }

  stopPlayback() {
    this.model.stopPlayback()
      .then(() => { this.view.stopPlayback(this.model.player.hasSource()); });
  }

      //  --------------------------------  VOLUME METHODS  ---------------------------------  //

  mute() { this.model.mute(); }

  unmute() { this.model.unmute(); }

  toggleMute() {
    this.model.toggleMute()
      .then(() => { this.view.updateVolume(this.model.player.getIsMuted(), this.model.getVolume()); });
  }

  adjustVolume(amount) {
    this.model.adjustVolume(amount)
      .then(() => { this.view.updateVolume(this.model.player.getIsMuted(), this.model.getVolume()); });
  }

  setVolume(volume) {
    this.model.setVolume(volume)
      .then(() => { this.view.updateVolume(this.model.player.getIsMuted(), this.model.getVolume()); });
  }

  getIsMuted() { return this.model.player.getIsMuted(); }
  getVolume() { return this.model.getVolume(); }

      //  --------------------------------  PROGRESS METHODS  ---------------------------------  //

  getProgress() { return this.model.player.getProgress(); }

  adjustProgress(amount) {
    this.model.adjustProgress(amount)
      .then(() => { this.view.updateProgress(this.model.player.getProgress()); });
  }

  setProgress(progress) {
    this.model.setProgress(progress)
      .then(() => { this.view.updateProgress(this.model.player.getProgress()); });
  }

  trackEnded() {
    this.stopPlayback(); // Only when no repetition is set and end of pl is reached TODO
    // TODO repeat value to get here
//    this.model.player.repeatTrack(); // Repeat one
// If repeat off ->  this.model.stopPlayback(); .then( this.view.restoreDefault();
  }

}

export default Mzk;
