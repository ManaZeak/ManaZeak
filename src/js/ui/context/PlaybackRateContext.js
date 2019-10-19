import ContextMenu from '../component/overlay/ContextMenu.js';
import PlaybackRateBar from '../component/bar/PlaybackRateBar';
'use strict';


class PlaybackRateContext extends ContextMenu {


  constructor(options) {
    super(options);

    this._playbackRateBar = {};
    this._animationLockId = -1;
  }


  setActions(doc) {
    this._dom.container = doc.getElementsByClassName('playback-rate-context')[0];
  }


  _open(options) {
    if (this._animationLockId === -1) {
      this._animationLockId = 42;
      this._dom.container.style.right = `${options.rightOffset}px`;
      this._target.appendChild(this._overlay);
      this._playbackRateBar = new PlaybackRateBar();

      requestAnimationFrame(() => {
        this._dom.container.style.opacity = `1`;
        requestAnimationFrame(() => {
          this._dom.container.style.transform = `translateY(0)`;
        });

        setTimeout(() => {
          this._animationLockId = -1;
        }, 250);
      });
    }
  }


  _close() {
    if (this._target.contains(this._overlay) && this._animationLockId === -1) {
      // Animate playback rate arrival on UI
      requestAnimationFrame(() => {
        this._dom.container.style.opacity = `0`;
        requestAnimationFrame(() => {
          this._dom.container.style.transform = `translateY(50px)`;
        });
      });
      // Actually remove after approximately after translation of 250 ms
      this._animationLockId = setTimeout(() => {
        this._animationLockId = -1;
        this._playbackRateBar = null;
      }, 250);
    }
  }


  updatePlaybackRate(percentage) {
    if (this._playbackRateBar !== null) {
      this._playbackRateBar.updatePlaybackRate(percentage, mzk.playbackRate);
    }
  }


}


export default PlaybackRateContext;
