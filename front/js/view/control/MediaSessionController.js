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
    this._appliedMetadata = null

    this._init();
    this._setActionHandlers();
  }


  _init() {
    if (DEBUG) { console.log('MediaSessionController._init : called'); }
    if ('mediaSession' in navigator) {
      this._isSupported = true;
      // TODO Translate with local front nls
      this._appliedMetadata = new MediaMetadata({
        title: 'ManaZeak',
        artist: '',
        album: `Let's play something!`,
        artwork: [{
          src: `${window.location.origin}/static/img/logo/manazeak-logo-square.png`,
          sizes: '1000x1000',
          type: 'image/png'
        }, {
          src: `${window.location.origin}/static/img/logo/manazeak-logo-square.png`,
          sizes: '500x500',
          type: 'image/png'
        }, {
          src: `${window.location.origin}/static/img/logo/manazeak-logo-square.png`,
          sizes: '200x200',
          type: 'image/png'
        }, {
          src: `${window.location.origin}/static/img/logo/manazeak-logo-square.png`,
          sizes: '100x100',
          type: 'image/png'
        }]
      });
    }
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
        ['seekto', data => { mzk.setProgress(Utils.precisionRound((data.seekTime * 100) / mzk.ctrl.player.duration, 3)); }]
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
      this._appliedMetadata.title = 'ManaZeak';
      this._appliedMetadata.artist = '';
      this._appliedMetadata.album = `Let's play something!`;

      this._appliedMetadata.artwork = [{
        src: `${window.location.origin}/static/img/logo/manazeak-logo-square.png`,
        sizes: '1000x1000',
        type: 'image/png'
      }, {
        src: `${window.location.origin}/static/img/logo/manazeak-logo-square.png`,
        sizes: '500x500',
        type: 'image/png'
      }, {
        src: `${window.location.origin}/static/img/logo/manazeak-logo-square.png`,
        sizes: '200x200',
        type: 'image/png'
      }, {
        src: `${window.location.origin}/static/img/logo/manazeak-logo-square.png`,
        sizes: '100x100',
        type: 'image/png'
      }];

      navigator.mediaSession.metadata = this._appliedMetadata;
    }
  }


  setTrack(track) {
    if (DEBUG) { console.log('MediaSessionController.setDefault : called with', track); }
    if (this._isSupported === true) {
      this._appliedMetadata.title = track.title;
      this._appliedMetadata.artist = track.artist;
      this._appliedMetadata.album = track.album;

      const cover = track.cover.substring(track.cover.lastIndexOf('/') + 1, track.cover.length);
      this._appliedMetadata.artwork = [{
        src: `${window.location.origin}/resources/covers/orig/${cover}`,
        sizes: '1000x1000',
        type: 'image/jpeg'
      }, {
        src: `${window.location.origin}/resources/covers/large/${cover}`,
        sizes: '500x500',
        type: 'image/jpeg'
      }, {
        src: `${window.location.origin}/resources/covers/medium/${cover}`,
        sizes: '200x200',
        type: 'image/jpeg'
      }, {
        src: `${window.location.origin}/resources/covers/small/${cover}`,
        sizes: '100x100',
        type: 'image/jpeg'
      }];

      navigator.mediaSession.metadata = this._appliedMetadata;
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


}


export default MediaSessionController;
