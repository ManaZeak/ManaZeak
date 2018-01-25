/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  QueuePreview class                             *
 *                                                 *
 *  Classical queue (pre)view                      *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

import { removeVisibilityLock, addVisibilityLock, isVisibilityLocked } from '../../../utils/Utils.js'
import Shortcut from '../../../utils/Shortcut.js'
import MzkObject from '../../../core/MzkObject.js'

class QueuePreview extends MzkObject {

    constructor(container) {
        super();
        this.contextMenu = null;
        this.reverse     = window.app.queue.isReverse();
        this.isLocked    = false;
        this._createUI(container);
        this._eventListener();
        this._keyListener();
        this._contextMenuSetup();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : hide (public)
     * class  : QueuePreview
     * desc   : Hide QueuePreview
     **/
    hide() {
        this.isLocked = false;
        removeVisibilityLock(this.ui.container);
    }


    /**
     * method : lock (public)
     * class  : QueuePreview
     * desc   : Show and lock QueuePreview
     **/
    lock() {
        this.isLocked = true;
        addVisibilityLock(this.ui.container);
    }


    /**
     * method : preview (public)
     * class  : QueuePreview
     * desc   : Shows a queue preview of 2 seconds
     **/
    preview() {
        if (isVisibilityLocked(this.ui.container)) {
            return;
        }

        addVisibilityLock(this.ui.container);
        window.setTimeout(removeVisibilityLock.bind(null, this.ui.container), 2000);
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _addEntry (private)
     * class  : QueuePreview
     * desc   : Add an entry in QueuePreview
     * arg    : {object} track - The track to add as an entry
     **/
    _addEntry(track) {
        let li                         = document.createElement("LI");
        let img                        = document.createElement("IMG");
        let body                       = document.createElement("DIV");
        let title                      = document.createElement("SPAN");
        let origin                     = document.createElement("SPAN");
        let composer                   = document.createElement("SPAN");
        let qControls                  = document.createElement("DIV");
        let qControlsUp                = document.createElement("SPAN");
        let qControlsDown              = document.createElement("SPAN");

        body.className                 = "mzk-qprev-body";
        title.className                = "mzk-qprev-title";
        origin.className               = "mzk-qprev-origin";
        composer.className             = "mzk-qprev-composer";
        qControls.className            = "mzk-qprev-controls";

        title.innerText                = track.title;
        origin.innerText               = track.artist + ' - ' + track.album + ' (' + track.year + ')';
        composer.innerText             = 'Composed by: ' + track.composer;
        qControlsUp.innerText          = "U";
        qControlsDown.innerText        = "D";
        img.src                        = track.cover;

        qControlsUp.dataset.callback   = "moveUp";
        qControlsDown.dataset.callback = "moveDown";

        body.appendChild(title);
        body.appendChild(origin);
        body.appendChild(composer);

        qControls.appendChild(qControlsUp);
        qControls.appendChild(qControlsDown);

        li.appendChild(img);
        li.appendChild(body);
        li.appendChild(qControls);

        this.ui.queueList.appendChild(li);
    }


    /**
     * method : _contextMenuSetup (private)
     * class  : QueuePreview
     * desc   : TODO
     **/
    _contextMenuSetup() {

    }


    /**
     * method : _createUI (private)
     * class  : QueuePreview
     * desc   : Build UI elements
     * arg    : {object} container - The QueuePreview container
     **/
    _createUI(container) {
        this.ui = {
            container:      document.createElement("DIV"),
            statusBar:  {
                container:  document.createElement("DIV"),
                trackCount: document.createElement("SPAN"),
                reverseBox: document.createElement("INPUT"),
                reverseLbl: document.createElement("LABEL")
            },
            queueList:      document.createElement("UL"),
            queueEmpty:     document.createElement("LI")
        };

        this.ui.container.className            = "mzk-queue-preview";
        this.ui.statusBar.container.className  = "mzk-queue-status";
        this.ui.queueList.className            = "mzk-queue-list";
        this.ui.queueEmpty.className           = "mzk-queue-empty";
        this.ui.statusBar.trackCount.innerText = "0 tracks";
        this.ui.statusBar.reverseLbl.innerText = "Reverse Play:";
        this.ui.statusBar.reverseBox.type      = "checkbox";
        this.ui.statusBar.reverseBox.value     = this.reverse;
        this.ui.queueEmpty.innerHTML           = "The Queue is empty";

        this.ui.queueList.appendChild(this.ui.queueEmpty);
        this.ui.statusBar.container.appendChild(this.ui.statusBar.trackCount);
        this.ui.statusBar.container.appendChild(this.ui.statusBar.reverseLbl);
        this.ui.statusBar.reverseLbl.appendChild(this.ui.statusBar.reverseBox);
        this.ui.container.appendChild(this.ui.queueList);
        this.ui.container.appendChild(this.ui.statusBar.container);

        container.appendChild(this.ui.container);
    }


    /**
     * method : _keyListener (private)
     * class  : QueuePreview
     * desc   : QueuePreview key event listeners
     **/
    _keyListener() {
        let that = this;
        this.addShortcut(new Shortcut('keydown', 'KeyA', function() {
            if (that.isLocked) {
                that.hide();
            }

            else {
                that.lock();
            }
        }));
    }


    /**
     * method : _eventListener (private)
     * class  : QueuePreview
     * desc   : QueuePreview event listeners
     **/
    _eventListener() {
        let that = this;
        let findParentLI = function(element) {
            while (element.tagName !== 'UL' && element.tagName !== 'LI') {
                element = element.parentNode;

                if (element.tagName === 'LI') { return element; }
                else                          { return null;    }
            }
        };
        this.ui.statusBar.reverseBox.addEventListener('click', function() {
            window.app.reverseQueue(!that.reverse);
            that.ui.statusBar.reverseBox.checked ^= true;
        });
        this.ui.queueList.addEventListener('click', function(event) {
            let li, sib;

            switch (event.target.dataset.callback) {
                case 'moveUp':
                    li = findParentLI(event.target);

                    if (li !== null || li !== undefined) {
                        sib = li.previousSibling;

                        if (sib !== null || li !== undefined) {
                            for (let i = 0; li.parentNode.children[i] !== li; ++i) {}

                            that.ui.queueList.insertBefore(that.ui.queueList.removeChild(li), sib);
                            window.app.moveQueue(i, i -1);
                        }
                    }
                    break;

                case 'moveDown':
                    li = findParentLI(event.target);
                    if (li !== null || li !== undefined) {
                        sib = li.nextSibling;

                        if (sib !== null || li !== undefined) {
                            for (let i = 0; li.parentNode.children[i] !== li; ++i) {}

                            that.ui.queueList.insertBefore(that.ui.queueList.removeChild(li), sib.nextSibling);
                            window.app.moveQueue(i, i + 1);
                        }

                    }
                    break;

                default:
                    break;
            }
        });
        document.body.addEventListener('click', function() {
            removeVisibilityLock(that.ui.container);
        });
        window.app.listen('pushQueue', function(track) {
            that._addEntry(track);
            that.ui.statusBar.trackCount.innerText = (that.ui.queueList.childNodes.length - 1) + " tracks";
        });
        window.app.listen('popQueue', function() {
            that.ui.queueList.removeChild(that.reverse ? that.ui.queueList.lastChild : that.ui.queueList.firstChild.nextSibling);
            that.ui.statusBar.trackCount.innerText = (that.ui.queueList.childNodes.length - 1) + " tracks";
        });
        window.app.listen('reverseQueue', function(reverse) {
            that.reverse = reverse;
        });
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getIsLocked() { return this.isLocked; }

}

export default QueuePreview