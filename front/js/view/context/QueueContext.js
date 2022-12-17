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

    this._clearQueueButton = null;

    this._emptyQueueDom = null;
    this._emptyPlayObjectDom = null;
  }


  setActions(doc) {
    // Save emtpy DOMs from first template load
    this._emptyQueueDom = doc.getElementsByClassName('queue')[0].innerHTML;
    this._emptyPlayObjectDom = doc.getElementsByClassName('play-object')[0].innerHTML;
    this._clearQueueButton = doc.getElementsByClassName('queue-remove-all-tracks')[0];
    this._clearQueueButton.addEventListener('click', this._clearQueueTracksClicked.bind(this));
  }


  _open(options) {
    // Position queue to the left and add to view
    this._dom.style.left = `${options.leftOffset}px`;
    this._target.appendChild(this._overlay);
    // Update queue height depending on its content (track are build off screen, not handled in _open)
    const queue = this._dom.getElementsByClassName('queue')[0];
    // First case, empty queue or less than 6 tracks
    if (queue.innerHTML === this._emptyQueueDom || queue.children.length < 6) {
      queue.style.height = 'auto';
    } else {
      // Otherwise, we fset a fixed height to queue then create a scrollbar
      queue.style.height = '40rem';
      this._scroll = new ScrollBar({
        target: queue,
        style: {
          color: '#56D45B'
        }
      });
    }
  }


  /* Tracks */


  updateQueuedTracks(tracks) {
    const queue = this._dom.getElementsByClassName('queue')[0];
    if (tracks.length === 0) {
      this._restoreQueueEmptyDom();
    } else {
      queue.innerHTML = '';
      this._clearQueueButton.classList.remove('hidden');
      for (let i = 0; i < tracks.length; ++i) {
        this._buildQueuedTrackDom(tracks[i]).then(track => {
          queue.appendChild(track);
          track.querySelector('.queue-track-remove').addEventListener('click', () => {
            mzk.ctrl.removeFromQueue(track.dataset.id);
            if (track.parentNode.children.length === 1) {
              this._restoreQueueEmptyDom();
              mzk.ui.updateQueueNumber(0);
            } else {
              mzk.ui.updateQueueNumber(track.parentNode.children.length - 1);
              track.remove();
            }
          });
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
        entry.dataset.id = track.id;
        resolve(entry);
      });
    });
  }


  _restoreQueueEmptyDom() {
    if (this._scroll) {
      this._scroll.destroy();
      this._scroll = null;
    }
    const queue = this._dom.getElementsByClassName('queue')[0];
    this._dom.className = 'queue-context'; // Remove any scroll class
    queue.innerHTML = this._emptyQueueDom;
    queue.style.height = 'auto';
    this._clearQueueButton.classList.add('hidden');
  }


  _clearQueueTracksClicked() {
    mzk.clearQueueTracks();
    this._queuedTracks = [];
    this._restoreQueueEmptyDom();
  }


  /*  PlayObject */


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
