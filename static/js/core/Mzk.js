import Komunikator from './Komunikator.js'
import User from './User.js'
import Model from '../model/Model.js'
import View from '../view/View.js'

class Mzk {

  constructor() {
    this.cookies = {};
    this.komunikator = {};
    this.user = {};
    this.lang = {}
    this.model = {};
    this.view = {};
  }

  //  --------------------------------  SESSION INITIALIZATION  ---------------------------------  //

  init() {
    this.cookies = Utils.getCookies(); // Get user cookies

    this._initKomunikator()
      .then(() => { return this._initLang(); })
      .then(() => { return this._initUser(); })
      .then(() => { return this._initModel(); })
      .then(() => { return this._initView(); })
      .then(() => { return this._initShortcut(); });
  }

  _initKomunikator() {
    return new Promise(resolve => {
      this.komunikator = new Komunikator({ csrfToken: this.cookies['csrftoken'] });
      resolve();
    });
  }

  _initUser() {
    return new Promise((resolve, reject) => {
      this.user = new User();
      this.komunikator.get('user/getInformation/')
        .then(userInfo => { this.user.updateProperties(userInfo); resolve(); })
        .catch(errorCode => { Errors.raise({ code: errorCode, frontend: true }); resolve() }); // TODO : send reject over this promise, as fatal error
    });
  }

  _initLang() {
    let checkLang = (lang) => { // In case language JSON can not be fetched, we raise a manual notification only.
      if (lang.DONE) { this.lang = lang; }
      else { Notification.new({ type: 'error', title: 'Unable to load language', message: 'Something went wrong, languages settings can not be received.' }); }
    };

    return new Promise(resolve => {
      let options = {
        LANG: (navigator.language || navigator.userLanguage)
      }

      this.komunikator.post('language/', options)
        .then(lang => { checkLang(lang); resolve(); }); // Errors can not be catched since language failed loading.
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
      this.reloadShortcuts();
      resolve();
    });
  }

//  --------------------------------  PLAYBACK METHODS  ---------------------------------  //

  changeTrack(id) {
    // TODO : get Track from id via Komunikator
    this.model.changeTrack((id === 5) ? '../static/101 - 501 - Black and Blue.flac' : 'http://static.kevvv.in/sounds/callmemaybe.mp3')
      .then(() => { this.view.changeTrack(this.model.getPlayer().getIsPlaying()); });
  }

  togglePlay() {
    this.model.togglePlay()
      .then(() => { this.view.togglePlay(this.model.getPlayer().getIsPlaying()); });
  }

  stopPlayback() {
    this.model.stopPlayback()
      .then(() => { this.view.stopPlayback(this.model.getPlayer().hasSource()); });
  }

//  --------------------------------  VOLUME METHODS  ---------------------------------  //

  mute() { this.model.mute(); }

  unmute() { this.model.unmute(); }

  toggleMute() {
    this.model.toggleMute()
      .then(() => { this.view.updateVolume(this.model.getPlayer().getIsMuted(), this.model.getVolume()); });
  }

  adjustVolume(amount) {
    this.model.adjustVolume(amount)
      .then(() => { this.view.updateVolume(this.model.getPlayer().getIsMuted(), this.model.getVolume()); });
  }

  setVolume(volume) {
    this.model.setVolume(volume)
      .then(() => { this.view.updateVolume(this.model.getPlayer().getIsMuted(), this.model.getVolume()); });
  }

  getIsMuted() { return this.model.getPlayer().getIsMuted(); }
  getVolume() { return this.model.getVolume(); }

  showHideVolumeBar() { this.view.getFootBar().getVolumeBar().startShowHide(); }

//  --------------------------------  PROGRESS METHODS  ---------------------------------  //

  getProgress() { return this.model.getPlayer().getProgress(); }

  adjustProgress(amount) {
    this.model.adjustProgress(amount)
      .then(() => { this.view.updateProgress(this.model.getPlayer().getProgress()); });
  }

  setProgress(progress) {
    this.model.setProgress(progress)
      .then(() => { this.view.updateProgress(this.model.getPlayer().getProgress()); });
  }

  trackEnded() {
    this.stopPlayback(); // Only when no repetition is set and end of pl is reached TODO
    // TODO repeat value to get here
//    this.model.getPlayer().repeatTrack(); // Repeat one
// If repeat off ->  this.model.stopPlayback(); .then( this.view.restoreDefault();
  }

//  --------------------------------  SHORTCUTS METHODS  ---------------------------------  //

  reloadShortcuts() {
    this.getCollection();
    Shortcut.removeAll();
    // TODO : get from komunikator user bindings
    Shortcut.register('Ctrl+Shift+ArrowDown', () => { this.showHideVolumeBar(); this.adjustVolume(-0.25); });
    Shortcut.register('Ctrl+Shift+ArrowUp', () => { this.showHideVolumeBar(); this.adjustVolume(0.25); });
    Shortcut.register('Ctrl+ArrowDown', () => { this.showHideVolumeBar(); this.adjustVolume(-0.1); });
    Shortcut.register('Ctrl+ArrowUp', () => { this.showHideVolumeBar(); this.adjustVolume(0.1); });
    Shortcut.register('ArrowDown', () => { this.showHideVolumeBar(); this.adjustVolume(-0.01); });
    Shortcut.register('ArrowUp', () => { this.showHideVolumeBar(); this.adjustVolume(0.01); });
  }

  //  --------------------------------  COLLECTION METHODS  ---------------------------------  //

  getCollection() {
    this.komunikator.get('playlist/getUserPlaylists/')
      .then(collection => {
        this.model.initCollection(collection)
          .then(a => {
            this.view.initCollection(collection);
          })
          .catch(errorKey => { Errors.raise({ code: errorKey, frontend: false }); });
      })
      .catch(errorKey => { Errors.raise({ code: errorKey, frontend: true }); });
  }
}

export default Mzk;
