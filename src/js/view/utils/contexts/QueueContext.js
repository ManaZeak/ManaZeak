import ContextMenu from '../overlays/ContextMenu.js';
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


  _fillQueueTracksContainer(queuedTracks) {
    if (queuedTracks.length > 0) {
      this._fillQueuedTracks(queuedTracks);
      this._dom.status.innerHTML = `${queuedTracks.length} queued tracks (${Utils.totalTracksDuration(queuedTracks)})`;
    } else if (queuedTracks.length === 0) {
      this._dom.status.innerHTML = 'No tracks in the queue';
      this._dom.container.innerHTML = '';
      this._dom.container.appendChild(this._emptyContainer);
    }
  }


  _fillQueuedTracks(tracks) {
    this._dom.container.innerHTML = '';

    for (let i = 0; i < tracks.length; ++i) {
      const uiTrack = document.createElement('DIV');
      uiTrack.classList.add('queued-track');
      uiTrack.dataset.before = i + 1;

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

      const actions = document.createElement('DIV');
      const navUp = document.createElement('IMG');
      const remove = document.createElement('IMG');
      const navDown = document.createElement('IMG');
      navUp.src = '/static/img/navigation/nav-up.svg';
      remove.src = '/static/img/actions/delete.svg';
      navDown.src = '/static/img/navigation/nav-down.svg';
      this._moveTrackInQueueEvents(navDown, navUp, i);
      actions.appendChild(navUp);
      //actions.appendChild(remove);
      actions.appendChild(navDown);


      uiTrack.appendChild(cover);
      uiTrack.appendChild(title);
      uiTrack.appendChild(artist);
      uiTrack.appendChild(actions);

      this._dom.container.appendChild(uiTrack);
    }
  }


  _moveTrackInQueueEvents(navDown, navUp, index) {
    navDown.addEventListener('click', () => {
      mzk.model.swapQueueDown(index);
    });

    navUp.addEventListener('click', () => {
      mzk.model.swapQueueUp(index);
    });
  }


  open(options) { // TODO change to queue queuedTracks
    this._fillQueueTracksContainer(options.queue);

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


  updateQueuedTracks(queuedTracks) {
    this._fillQueueTracksContainer(queuedTracks);
  }


}

export default QueueContext;
