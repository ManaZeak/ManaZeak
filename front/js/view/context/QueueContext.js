import ContextMenu from './ContextMenu.js';
import ScrollBar from "../navigation/ScrollBar.js";


class QueueContext extends ContextMenu {


  constructor(options) {
    super(options);
    // Contains all queued Track object in an array
    this._queuedTracks = [];
    this._playObject = {};

    this._emptyQueueDom = null;
    this._emptyPlayObjectDom = null;
  }


  setActions(doc) {
    this._emptyQueueDom = doc.getElementsByClassName('queue')[0].innerHTML;
    this._emptyPlayObjectDom = doc.getElementsByClassName('play-object')[0].innerHTML;
  }


  _open(options) {
    this._dom.style.left = `${options.leftOffset}px`;
    this._target.appendChild(this._overlay);
  }


  updateQueuedTracks(tracks) {
    const queue = this._dom.getElementsByClassName('queue')[0];
    if (tracks.length === 0) {
      queue.innerHTML = this._emptyQueueDom;
    } else {
      queue.innerHTML = '';
      for (let i = 0; i < tracks.length; ++i) {
        this._buildQueueTrackDom(tracks[i]).then(track => {
          queue.appendChild(track);
        });
      }
    }
  }


  _buildQueueTrackDom(track) {
    return new Promise(resolve => {
      mzk.kom.getText('/fragment/entry/queuetrack/').then(response => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');
        const entry = doc.getElementsByClassName('queue-track-entry')[0];
        entry.querySelector('#queue-track-cover').src = track.cover;
        entry.querySelector('#queue-track-title').innerHTML = track.title;
        entry.querySelector('#queue-track-artist').innerHTML = track.artist;
        entry.querySelector('#queue-track-duration').innerHTML = track.duration;
        resolve(entry);
      });
    });
  }


}


export default QueueContext;
