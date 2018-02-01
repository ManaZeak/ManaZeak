/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  Controls class                                 *
 *                                                 *
 *  Handle the player controls                     *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

import VolumeBar from './VolumeBar.js'
import QueuePreview from './QueuePreview.js'

class Controls  {

    constructor(container, queuePreview, volumeBar) {
        this._createUI(container, queuePreview, volumeBar);
        if(queuePreview !== false)
            this.queuePreview = new QueuePreview(this.ui.queueExpander.button);
        if(volumeBar !== false)
            this.volumeBar    = new VolumeBar(this.container);
        this._eventListener();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : Controls
     * desc   : Build UI elements
     * arg    : {object} container - The Controls container
     **/
    _createUI(container, queuePreview, volumeBar) {
        this.container = document.createElement("DIV");
        this.ui        = {
            play: {
                button:  document.createElement("A"),
                image:   document.createElement("IMG")
            },
            stop: {
                button:  document.createElement("A"),
                image:   document.createElement("IMG")
            },
            repeat: {
                button:  document.createElement("A"),
                image:   document.createElement("IMG")
            },
            shuffle: {
                button:  document.createElement("A"),
                image:   document.createElement("IMG")
            },
            next: {
                button:  document.createElement("A"),
                image:   document.createElement("IMG")
            },
            previous: {
                button:  document.createElement("A"),
                image:   document.createElement("IMG")
            },
            queueExpander: {
                button:  document.createElement("DIV"),
                image:   document.createElement("IMG")
            }
        };

        this.container.className               = "mzk-controls";

        this.ui.play.image.src                 = "/static/img/player/play.svg";
        this.ui.stop.image.src                 = "/static/img/player/stop.svg";
        this.ui.repeat.image.src               = "/static/img/player/repeat.svg";
        this.ui.shuffle.image.src              = "/static/img/player/shuffle.svg";
        this.ui.next.image.src                 = "/static/img/player/next.svg";
        this.ui.previous.image.src             = "/static/img/player/previous.svg";
        this.ui.queueExpander.image.src        = "/static/img/player/queue.svg";

        this.ui.play.button.className          = "mzk-controls-play";
        this.ui.stop.button.className          = "mzk-controls-stop";
        this.ui.repeat.button.className        = "mzk-controls-repeat";
        this.ui.shuffle.button.className       = "mzk-controls-shuffle";
        this.ui.next.button.className          = "mzk-controls-next";
        this.ui.previous.button.className      = "mzk-controls-previous";
        this.ui.queueExpander.button.className = "mzk-queue-expander";

        this.ui.repeat.button.appendChild(this.ui.repeat.image);
        this.ui.shuffle.button.appendChild(this.ui.shuffle.image);
        this.ui.previous.button.appendChild(this.ui.previous.image);
        this.ui.play.button.appendChild(this.ui.play.image);
        this.ui.stop.button.appendChild(this.ui.stop.image);
        this.ui.next.button.appendChild(this.ui.next.image);
        this.ui.queueExpander.button.appendChild(this.ui.queueExpander.image);

        this.container.appendChild(this.ui.repeat.button);
        this.container.appendChild(this.ui.shuffle.button);
        this.container.appendChild(this.ui.previous.button);
        this.container.appendChild(this.ui.play.button);
        this.container.appendChild(this.ui.stop.button);
        this.container.appendChild(this.ui.next.button);

        if(queuePreview !== false) {
            this.container.appendChild(this.ui.queueExpander.button);
        }

        container.appendChild(this.container);
    }


    /**
     * method : _eventListener (private)
     * class  : Controls
     * desc   : Controls event listeners
     **/
    _eventListener() {
        let that = this;
        this.ui.play.button.addEventListener("click", function() { window.app.togglePlay(); });
        this.ui.stop.button.addEventListener("click", function() { window.app.stopPlayback(); });
        this.ui.shuffle.button.addEventListener("click", function() { window.app.toggleShuffle(); });
        this.ui.repeat.button.addEventListener("click", function() { window.app.toggleRepeat(); });
        this.ui.next.button.addEventListener("click", function() { window.app.next(); });
        this.ui.previous.button.addEventListener("click", function() { window.app.previous(); });

        if(this.queuePreview) {
            this.ui.queueExpander.button.addEventListener("click", function () {
                if(event.target != that.ui.queueExpander.image && event.target != that.ui.queueExpander.button)
                    return;
                if (that.queuePreview.getIsLocked()) {
                    let self = that;
                    window.setTimeout(function () {
                        self.queuePreview.hide();
                        self.ui.queueExpander.image.src = "/static/img/player/queue.svg";
                    }, 50); // 50ms to avoid double click open/close instant QueuePreview
                }

                else {
                    let self = that;
                    window.setTimeout(function () {
                        self.queuePreview.lock();
                        self.ui.queueExpander.image.src = "/static/img/player/queue-locked.svg";
                    }, 50); // 50ms to avoid double click open/close instant QueuePreview
                }
            });
            window.app.listen('pushQueue', function () {
                that.queuePreview.preview();
            });
        }

        window.app.listen(['togglePlay', 'stopPlayback'], function() {
            that._setPlayPause();
        });
        window.app.listen("toggleShuffle", function() {
            let shuffleMode = window.app.activePlaylist.getShuffleMode();

            if (shuffleMode === 0) {
                that.ui.shuffle.image.src = "/static/img/player/shuffle.svg";
            }

            else {
                that.ui.shuffle.image.src = "/static/img/player/shuffle-on.svg";
            }
        });
        window.app.listen("toggleRepeat", function() {
            let repeatMode = window.app.activePlaylist.getRepeatMode();

            if (repeatMode === 0) {
                that.ui.repeat.image.src = "/static/img/player/repeat.svg";
            }

            else {
                that.ui.repeat.image.src = "/static/img/player/repeat-on.svg";
            }
        });
    }


    /**
     * method : _setPlayPause (private)
     * class  : Controls
     * desc   : Change Play/Pause image source depending on player status
     **/
    _setPlayPause() {
        if (window.app.player.getIsPlaying() === true) {
            this.ui.play.image.src = "/static/img/player/pause.svg";
        }

        else {
            this.ui.play.image.src = "/static/img/player/play.svg";
        }
    }

}

export default Controls