import ContextMenu from '../overlays/ContextMenu.js';
import PlaybackRateBar from '../../../view/footbar/components/PlaybackRateBar';
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


  open(options) {
    if (this._animationLockId === -1) {
      this._animationLockId = 42;
      this._dom.container.style.right = `${options.rightOffset}px`;
      this._target.appendChild(this._overlay);
      this._overlay.addEventListener('click', this._viewportClicked, false);
      this._playbackRateBar = new PlaybackRateBar();

      requestAnimationFrame(() => {
        this._dom.container.style.opacity = `1`;
        requestAnimationFrame(() => {
          this._dom.container.style.height = `50px`;
        });

        setTimeout(() => {
          this._animationLockId = -1;
        }, 250);
      });
    }
  }


  close() {
    if (this._target.contains(this._overlay) && this._animationLockId === -1) {
      requestAnimationFrame(() => {
        this._dom.container.style.opacity = `0`;
        requestAnimationFrame(() => {
          this._dom.container.style.height = `0`;
        });
      });

      this._animationLockId = setTimeout(() => {
        this._target.removeChild(this._overlay);
        this._overlay.removeEventListener('click', this._viewportClicked, false);
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
