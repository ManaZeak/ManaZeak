import ContextMenu from '../ContextMenu.js';
'use strict';


class QueueContext extends ContextMenu {


  constructor(options) {
    super(options);
  }


  setActions(doc) {
    this._dom.container = doc.getElementsByClassName('track-container')[0];
    this._dom.status = doc.getElementsByClassName('queue-status')[0];
    this._emptyContainer = doc.getElementsByClassName('track-container')[0].children[0];
  }


  _fillQueuedTracks(tracks) {
    this._dom.container.innerHTML = '';

    for (let i = 0; i < tracks.length; ++i) {
      const uiTrack = document.createElement('DIV');
      uiTrack.classList.add('queued-track');

      const cover = document.createElement('IMG');

      if (tracks[i].cover) {
        cover.src = `/static/img/covers/${tracks[i].cover}`;
      } else {
        cover.src = `/static/img/default/cover.svg`;
      }

      const title = document.createElement('P');
      title.innerHTML = tracks[i].title;

      const artist = document.createElement('P');
      artist.innerHTML = tracks[i].artist;

      uiTrack.appendChild(cover);
      uiTrack.appendChild(title);
      uiTrack.appendChild(artist);
      this._dom.container.appendChild(uiTrack);
    }
  }


  open(options) {
    if (options.queue.length > 0) {
      this._fillQueuedTracks(options.queue);
      this._dom.status.innerHTML = `${options.queue.length} queued tracks (${Utils.totalTracksDuration(options.queue)})`;
    } else if (options.queue.length === 0) {
      this._dom.status.innerHTML = 'No tracks in the queue';
      this._dom.container.innerHTML = '';
      this._dom.container.appendChild(this._emptyContainer);
    }

    this._dom.style.right = `${options.rightOffset}px`;
    this._target.appendChild(this._overlay);
    this._overlay.addEventListener('click', this._viewportClicked, false);
  }


  close() {
    if (this._target.contains(this._overlay)) {
      this._target.removeChild(this._overlay);
      this._overlay.removeEventListener('click', this._viewportClicked, false);
    }
  }
}

export default QueueContext;
