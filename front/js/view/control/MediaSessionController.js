import ProgressControlEnum from '../../utils/enum/ProgressControl.js';


class MediaSessionController {


  /**
   * @summary Device MediaSession controller
   * @author Arthur Beaulieu
   * @since November 2023
   * @description <blockquote></blockquote>
   **/
  constructor() {
    /** @private
     * @member {boolean} - Wether MediaSession is supported on device */
    this._isSupported = false;
    this._audio = null;

    this._init();
    this._events();
    this._setActionHandlers();
  }


  _init() {
    if (DEBUG) { console.log('MediaSessionController._init : called'); }
    if ('mediaSession' in navigator) {
      this._isSupported = true;
      this._audio = mzk.ctrl.player.player;
      // TODO Translate with local front nls
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'ManaZeak',
        artist: '',
        album: `Let's play something!`,
        artwork: [{
          src: `${window.location.origin}/static/img/logo/manazeak-logo-square.png`,
          sizes: '1000x1000',
          type: 'image/png'
        }, {
          src: `${window.location.origin}/static/img/logo/manazeak-logo-square.png`,
          sizes: '512x512',
          type: 'image/png'
        }, {
          src: `${window.location.origin}/static/img/logo/manazeak-logo-square.png`,
          sizes: '256x256',
          type: 'image/png'
        }, {
          src: `${window.location.origin}/static/img/logo/manazeak-logo-square.png`,
          sizes: '128x128',
          type: 'image/png'
        }]
      });
    }
  }


  _events() {
    this._audio.addEventListener('play', this.setPlay.bind(this, true));
    this._audio.addEventListener('pause', this.setPlay.bind(this, false));
  }


  _setActionHandlers() {
    if (DEBUG) { console.log('MediaSessionController._setActionHandlers : called'); }
    if (this._isSupported === true)  {
      const actionHandlers = [
        ['play', () => { mzk.setPlay(true); }],
        ['pause', () => { mzk.setPlay(false); }],
        ['previoustrack', () => { mzk.previous(); }],
        ['nexttrack', () => { mzk.next(); }],
        ['stop', () => { mzk.stopPlayback(); }],
        ['seekbackward', () => { mzk.adjustProgress(-ProgressControlEnum.SMALL_JUMP); }],
        ['seekforward', () => { mzk.adjustProgress(ProgressControlEnum.SMALL_JUMP); }],
        ['seekto', data => { mzk.setProgress(Utils.precisionRound((data.seekTime * 100) / this._audio.duration, 3)); }]
      ];

      for (const [action, handler] of actionHandlers) {
        try {
          navigator.mediaSession.setActionHandler(action, handler);
        } catch (error) {
          console.log(`The media session action "${action}" is not supported yet on this device/browser.`);
        }
      }
    }
  }


  setDefault() {
    if (DEBUG) { console.log('MediaSessionController.setDefault : called'); }
    if (this._isSupported === true) {
      this.setPlay(false);

      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'ManaZeak',
        artist: '',
        album: `Let's play something!`,
        artwork: [{
          src: `${window.location.origin}/static/img/logo/manazeak-logo-square.png`,
          sizes: '1000x1000',
          type: 'image/png'
        }, {
          src: `${window.location.origin}/static/img/logo/manazeak-logo-square.png`,
          sizes: '512x512',
          type: 'image/png'
        }, {
          src: `${window.location.origin}/static/img/logo/manazeak-logo-square.png`,
          sizes: '256x256',
          type: 'image/png'
        }, {
          src: `${window.location.origin}/static/img/logo/manazeak-logo-square.png`,
          sizes: '128x128',
          type: 'image/png'
        }]
      });
    }
  }


  setTrack(track) {
    if (DEBUG) { console.log('MediaSessionController.setDefault : called with', track); }
    if (this._isSupported === true) {
      const cover = track.cover.substring(track.cover.lastIndexOf('/') + 1, track.cover.length);
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist,
        album: track.album,
        artwork: [{
          src: `${window.location.origin}/resources/covers/orig/${cover}`,
          sizes: '1000x1000',
          type: 'image/jpeg'
        }, {
          src: `${window.location.origin}/resources/covers/large/${cover}`,
          sizes: '512x512',
          type: 'image/jpeg'
        }, {
          src: `${window.location.origin}/resources/covers/medium/${cover}`,
          sizes: '256x256',
          type: 'image/jpeg'
        }, {
          src: `${window.location.origin}/resources/covers/small/${cover}`,
          sizes: '128x128',
          type: 'image/jpeg'
        }]
      });
      this.updatePositionState();
    }
  }


  setPlay(state) {
    if (DEBUG) { console.log('MediaSessionController.setPlay : called with', state); }
    if (state === true) {
      navigator.mediaSession.playbackState = 'playing';
    } else {
      navigator.mediaSession.playbackState = 'paused';
    }
  }


  updatePositionState() {
    navigator.mediaSession.setPositionState({
      duration: this._audio.duration,
      playbackRate: this._audio.playbackRate,
      position: this._audio.currentTime
    });
  }


}


export default MediaSessionController;
