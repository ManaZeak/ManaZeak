/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  QueueView class - classical queue (pre)view                                        *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var QueuePreview = function(container) {
    this.contextMenu = null;
    this.reverse = window.app.queue.isReverse();

    this._createUI(container);
    this._eventListener();
    this._contextMenuSetup();

};

QueuePreview.prototype = {

    _createUI: function(container) {
        this.ui = {
            container:  document.createElement("DIV"),
            statusBar:  {
                container: document.createElement("DIV"),
                trackCount: document.createElement("SPAN"),
                reverseBox: document.createElement("INPUT"),
                reverseLbl: document.createElement("LABEL")
            },
            queueList:  document.createElement("UL")
        };

        this.ui.container.className             = "mzk-queue-preview";
        this.ui.statusBar.container.className   = "mzk-queue-status";
        this.ui.queueList.className             = "mzk-queue-list";

        this.ui.statusBar.trackCount.innerText  = "0 tracks";
        this.ui.statusBar.reverseLbl.innerText  = "Reverse Play:";
        this.ui.statusBar.reverseBox.type       = "checkbox";
        this.ui.statusBar.reverseBox.value      = this.reverse;

        this.ui.statusBar.container.appendChild(this.ui.statusBar.trackCount);
        this.ui.statusBar.container.appendChild(this.ui.statusBar.reverseLbl);
        this.ui.statusBar.reverseLbl.appendChild(this.ui.statusBar.reverseBox);

        this.ui.container.appendChild(this.ui.queueList);
        this.ui.container.appendChild(this.ui.statusBar.container);

        container.appendChild(this.ui.container);
    },

    addEntry: function(track) {
        var li              = document.createElement("LI");
        var img             = document.createElement("IMG");
        var body            = document.createElement("DIV");
        var title           = document.createElement("SPAN");
        var origin          = document.createElement("SPAN");
        var composer        = document.createElement("SPAN");
        var qControls       = document.createElement("DIV");
        var qControlsUp     = document.createElement("SPAN");
        var qControlsDown   = document.createElement("SPAN");

        body.className      = "mzk-qprev-body";
        title.className     = "mzk-qprev-title";
        origin.className    = "mzk-qprev-origin";
        composer.className  = "mzk-qprev-composer";
        qControls.className = "mzk-qprev-controls";

        title.innerText         = track.title;
        origin.innerText        = track.artist + ' - ' + track.album + ' (' + track.year + ')';
        composer.innerText      = 'Composed by: ' + track.composer;
        qControlsUp.innerText   = "U";
        qControlsDown.innerText = "D";

        qControlsUp.dataset.callback = "moveUp";
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
    },

    _eventListener: function() {
        var self = this;
        var findParentLI = function(element) {
            while(element.tagName != 'UL' && element.tagName != 'LI')
                element = element.parentNode;
            if(element.tagName == 'LI')
                return element;
            else
                return null;
        };

        window.app.addListener('pushQueue', function(track) {
           self.addEntry(track);
        });
        window.app.addListener('popQueue', function(track) {
           self.ui.queueList.removeChild(self.reverse ? self.ui.queueList.lastChild : self.ui.queueList.firstChild);
        });
        window.app.addListener('reverseQueue', function(reverse) {
            self.reverse = reverse;
        });

        this.ui.statusBar.reverseBox.addEventListener('click', function(event) {
            window.app.reverseQueue(!self.reverse);
        });

        this.ui.queueList.addEventListener('click', function(event) {
            var li, sib;
            switch(event.target.dataset.callback) {
                case 'moveUp':
                    li = findParentLI(event.target);
                    if(li != null) {
                        sib = li.previousSibling;
                        if(sib != null) {
                            for(var i = 0; li.parentNode.children[i] != li; i++);
                            self.ui.queueList.insertBefore(self.ui.queueList.removeChild(li), sib);
                            window.app.moveQueue(i, i -1);
                        }
                    }
                    break;
                case 'moveDown':
                    li = findParentLI(event.target);
                    if(li != null) {
                        sib = li.nextSibling;
                        if(sib != null) {
                            for(var i = 0; li.parentNode.children[i] != li; i++);
                            self.ui.queueList.insertBefore(self.ui.queueList.removeChild(li), sib.nextSibling);
                            window.app.moveQueue(i, i + 1);
                        }

                    }
                    break;
                default:
                    break;
            }
        });
    },

    _contextMenuSetup: function () {

    }
};