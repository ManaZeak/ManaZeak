import ContextMenu from './ContextMenu.js';
import ScrollBar from "../navigation/ScrollBar.js";


class QueueContext extends ContextMenu {


  constructor(options) {
    super(options);

    this._isFirstCall = true;
    // Contains all queued Track object in an array
    this._queuedTracks = [];
  }


  setActions(doc) {
    // this._dom.container = doc.getElementsByClassName('track-container')[0];
    // this._dom.status = doc.getElementsByClassName('queue-status')[0];
    // this._emptyContainer = doc.getElementsByClassName('track-container')[0].children[0];
  }


  _fillQueueTracksContainer(queuedTracks) {

  }


  _fillQueuedTracks(tracks) {
    this._queuedTracks = []; // Clear any previous Track in memory
  }


  _open(options) {
    /*
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
    */
  }


  updateQueuedTracks(queuedTracks) {

  }


}

export default QueueContext;
