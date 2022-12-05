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
    console.log(options)
//    this.dom.querySelector('.queue-context').innerHTML = '';
    this._dom.style.left = `${options.leftOffset}px`;
    this._target.appendChild(this._overlay);
  }


  updateQueuedTracks(tracks) {
    console.log(tracks)
  }


}


export default QueueContext;
