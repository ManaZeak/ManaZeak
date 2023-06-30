import Kom from './Kom';
import Lang from './Lang';
import UserInterface from '../view/UserInterface';
import Controller from './Controller.js';
import Data from './Data.js';


class Mzk {


  constructor() {
    this.kom = null;
    this.nls = null;
    this.ui = null;
    this.ctrl = null;
    this.data = null;
  }


  initSession() {
    // HTML template is loaded with loading overlay
    // Initializing communication and UI controllers
    this.kom = new Kom();
    this.nls = new Lang('en');
    this.ui = new UserInterface();
    this.ctrl = new Controller();
    this.data = new Data();
    // Init scene with main page
    this.setView({ name: 'MainPage' });
  }


  setView(options) {
    this.ui.setSceneView(options)
      .catch(() => Logger.raise('F_VIEW_SET_ERROR'));
  }


  setModal(options) {
    this.ui.setModal(options)
      .catch(() => Logger.raise('F_MODAL_SET_ERROR'));
  }


  changeTrack(options) {
    this.ctrl.changeTrack(options)
      .then(track => this.ui.changeTrack(track))
      .catch(err => console.error(err));
  }


  togglePlay() {
    this.ctrl.togglePlay();
    this.ui.setPlay(this.ctrl.player.playing);    
  }


  stopPlayback() {
    this.ctrl.stopPlayback();
    this.ui.stopPlayback();
  }


  toggleRepeatMode() {
    this.ctrl.toggleRepeatMode();
    this.ui.setRepeatMode(this.ctrl.repeatMode);
  }


  mute() {
    this.ctrl.mute();
  }


  unmute() {
    this.ctrl.unmute();
  }


  toggleMute() {
    this.ctrl.toggleMute();
    this.ui.setMute(this.ctrl.player);
  }


  adjustVolume(amount) {
    this.ctrl.adjustVolume(amount);
    this.ui.setVolume(this.ctrl.player);
  }


  setVolume(volume) {
    this.ctrl.setVolume(volume);
    this.ui.setVolume(this.ctrl.player);
  }


  adjustProgress(amount) {
    this.ctrl.adjustProgress(amount);
    this.ui.setProgress(this.ctrl.player.progress);
  }


  setProgress(progress) {
    this.ctrl.setProgress(progress);
    this.ui.setProgress(this.ctrl.player.progress);
  }


  setPlaybackRate(percentage) {
    this.ctrl.player.setPlaybackRate(percentage)
      .then(() => this.ui.setPlaybackRate(percentage))
      .catch(err => console.error(err));
  }


  previous() {
    this.ctrl.previous();
  }


  next() {
    this.ctrl.next();
  }


  queue(data) {
    this.ctrl.queue(data);
    this.ui.queue(this.ctrl.queuedTracks);
  }


  clearQueueTracks() {
    this.ctrl.clearQueueTracks();
    this.ui.clearQueueTracks();
  }


  download(options) {
    this.ctrl.download(options);
  }

}


export default Mzk;
