import Komunikator from './Komunikator.js'
import User from './User.js'
import Model from '../model/Model.js'
import View from '../view/View.js'
import Shortcut from './Shortcut.js'

class Mzk {

  constructor() {
    this.cookies = {};
    this.komunikator = {};
    this.user = {};
    this.lang = {}
    this.model = {};
    this.view = {};
    this.shortcut = {};
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  _initKomunikator() {
    return new Promise(resolve => {
      this.komunikator = new Komunikator(this.cookies['csrftoken']);
      resolve();
    });
  }

  _initUser() {
    return new Promise((resolve, reject) => {
      this.user = new User();
      this.komunikator.get('user/getInformation/')
        .then(response => { this.user.updateProperties(response); resolve(); })
        .catch(errorCode => { Errors.raise(errorCode, true); reject() });
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

  _initShortcut() {
    return new Promise(resolve => {
      this.shortcut = new Shortcut();
      this.reloadShortcuts();
      resolve();
    });
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  init() {
    this.cookies = Utils.getCookies(); // Get user cookies

// TODO komun useer lang
    Utils.getLangage(this.cookies['csrftoken'], (navigator.language || navigator.userLanguage)) // Fetch language keys/values to init View later
      .then(nls => { this.lang = nls; }) // Save langage in Mzk object
      .then(() => { return this._initKomunikator(); }) // Set Komunikator to handle backend comunication
      .then(() => { return this._initUser(); }) // Create User object that stores everything useful about a given user
      .then(() => { return this._initModel(); }) // Initialize mzk Model
      .then(() => { return this._initView(); }) // Initialize mzk View
      .then(() => { return this._initShortcut(); }); // Initialize mzk Shortcuts
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

  showHideVolumeBar() { this.view.getFootBar().getVolumeBar().startShowHide(); }

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

  // Shorctut

  reloadShortcuts() {
    // TODO : get from komunikator user bindings
    this.shortcut.register('Ctrl+Shift+ArrowDown', () => { this.showHideVolumeBar(); this.adjustVolume(-0.25); });
    this.shortcut.register('Ctrl+Shift+ArrowUp', () => { this.showHideVolumeBar(); this.adjustVolume(0.25); });
    this.shortcut.register('Ctrl+ArrowDown', () => { this.showHideVolumeBar(); this.adjustVolume(-0.1); });
    this.shortcut.register('Ctrl+ArrowUp', () => { this.showHideVolumeBar(); this.adjustVolume(0.1); });
    this.shortcut.register('ArrowDown', () => { this.showHideVolumeBar(); this.adjustVolume(-0.01); });
    this.shortcut.register('ArrowUp', () => { this.showHideVolumeBar(); this.adjustVolume(0.01); });
  }

}

export default Mzk;
