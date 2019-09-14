import QueueEntry from "./entries/QueueEntry.js";
import ContextMenu from '../overlays/ContextMenu.js';
import ScrollBar from "../ScrollBar.js";
'use strict';


class QueueContext extends ContextMenu {


  constructor(options) {
    super(options);

    this._isFirstCall = true;
    // Contains all queued Track object in an array
    this._queuedTracks = [];
  }


  setActions(doc) {
    this._dom.container = doc.getElementsByClassName('track-container')[0];
    this._dom.status = doc.getElementsByClassName('queue-status')[0];
    this._emptyContainer = doc.getElementsByClassName('track-container')[0].children[0];
  }


  _fillQueueTracksContainer(queuedTracks) {
    if (queuedTracks.length > 0 && queuedTracks.length < 1000) {
      // Handle lang plural
      let label = mzk.lang.context.queue.queuedtracks;
      if (queuedTracks.length === 1) {
        label = mzk.lang.context.queue.queuedtrack;
      }
      // Operate on queue context container
      this._dom.container.innerHTML = '';
      this._fillQueuedTracks(queuedTracks);
      this._dom.status.innerHTML = `${queuedTracks.length} ${label} (${Utils.totalTracksDuration(queuedTracks)})`;
    } else if (queuedTracks.length === 0) { // No track in queue
      this._dom.container.innerHTML = '';
      this._emptyContainer.innerHTML = mzk.lang.context.queue.help;
      this._dom.container.appendChild(this._emptyContainer);
      this._dom.status.innerHTML = mzk.lang.context.queue.notracks;
    } else if (queuedTracks.length >= 1000) { // No more than 1k tracks per batch (even if 1k is mega overkill...)
      Logger.raise({
        code: 'TOO_MUCH_TRACK_TO_ADD_TO_QUEUE',
        frontend: true
      });
    }
  }


  _fillQueuedTracks(tracks) {
    this._queuedTracks = []; // Clear any previous Track in memory

    for (let i = 0; i < tracks.length; ++i) {
      this._queuedTracks.push(new QueueEntry({
        renderTo: this._dom.container,
        track: tracks[i],
        i: i
      }));
    }
  }


  _open(options) {
    this._dom.container.innerHTML = '';
    this._fillQueueTracksContainer(options.queuedTracks);
    this._dom.style.right = `${options.rightOffset}px`;
    this._target.appendChild(this._overlay);

    if (this._isFirstCall === true) {
      this._isFirstCall = false;
      this._scrollBar = new ScrollBar({
        target: this._dom.container
      });
      this._dom.container = this._dom.container.firstChild.firstChild; // ScrollBar creates two wrappers
    } else {
      this._scrollBar.update();
    }
  }


  updateQueuedTracks(queuedTracks) {
    this._fillQueueTracksContainer(queuedTracks);
  }


}

export default QueueContext;
