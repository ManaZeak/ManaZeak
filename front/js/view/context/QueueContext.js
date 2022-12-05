import ContextMenu from './ContextMenu.js';
import ScrollBar from "../navigation/ScrollBar.js";


class QueueContext extends ContextMenu {


  constructor(options) {
    super(options);
    // Contains all queued Track object in an array
    this._queuedTracks = [];
    this._playObject = {};
  }


  setActions(doc) {
/*    this._commands.download = doc.getElementsByClassName('download')[0];*/
  }


  _open(options) {
    console.log(options)
//    this.dom.querySelector('.queue-context').innerHTML = '';
    this._dom.style.left = `${options.leftOffset}px`;
    this._target.appendChild(this._overlay);
  }


}


export default QueueContext;
