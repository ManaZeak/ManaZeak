import ContextMenu from './ContextMenu.js';
import ScrollBar from "../navigation/ScrollBar.js";


class QueueContext extends ContextMenu {


  constructor(options) {
    super(options);
    // Contains all queued Track object in an array
    this._queuedTracks = [];
    this._playObject = {};

    this._playObjectClickedId = -1;
    this._scroll = null;

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

    const queue = this._dom.getElementsByClassName('queue')[0];
    if (queue.innerHTML === this._emptyQueueDom) {
      queue.style.height = 'auto';
    } else {
      queue.style.height = '20rem';
      this._scroll = new ScrollBar({
        target: queue,
        style: {
          color: '#56D45B'
        }
      });
  
      requestAnimationFrame(() => {
        this._scroll.updateScrollbar();
      });
    }
  }


  updateQueuedTracks(tracks) {
    const queue = this._dom.getElementsByClassName('queue')[0];
    if (tracks.length === 0) {
      queue.innerHTML = this._emptyQueueDom;
    } else {
      queue.innerHTML = '';
      for (let i = 0; i < tracks.length; ++i) {
        this._buildQueuedTrackDom(tracks[i]).then(track => {
          queue.appendChild(track);
        });
      }
    }
  }


  _buildQueuedTrackDom(track) {
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


  updateQueuedPlayObject(playObject) {
    const po = this._dom.getElementsByClassName('play-object')[0];
    if (!playObject) {
      po.innerHTML = this._emptyPlayObjectDom;
    } else {
      Evts.removeEvent(this._playObjectClickedId);
      po.innerHTML = '';
      this._buildQueuedPlayObjectDom(playObject).then(dom => {
        po.appendChild(dom);
        this._playObjectClickedId = Evts.addEvent('click', po, this._playObjectClicked.bind(this, playObject), this);
      });
    }
  }


  _buildQueuedPlayObjectDom(playObject) {
    return new Promise(resolve => {
      mzk.kom.getText('/fragment/entry/queueplayobject/').then(response => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');
        const entry = doc.getElementsByClassName('queue-play-object-entry')[0];
        entry.querySelector('#queue-play-object-cover').src = playObject.cover;
        entry.querySelector('#queue-play-object-track').innerHTML = playObject.tracks[0].title;
        entry.querySelector('#queue-play-object-artist').innerHTML = playObject.artist;
        entry.querySelector('#queue-play-object-title').innerHTML = playObject.title;
        resolve(entry);
      });
    });
  }


  _playObjectClicked(playObject) {
    this.close();
    mzk.setView({
      name: playObject.type,
      id: playObject.id
    });
  }


}


export default QueueContext;
