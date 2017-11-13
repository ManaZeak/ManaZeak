/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Player class - handle song streaming client side, and std action on it             *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var Player = function(cookies) {
    this.cookies = cookies;

    this.player = document.getElementById("audioPlayer");

    this.oldVolume = 0;
    this.volumeLockId = -1;
    this.isVolumeLocked = false;

    this.isPlaying = false;
    this.isMuted   = false;
    this.isLooping = false;

    this.progressBar = new ProgressBar();
    this.volumeBar   = new VolumeBar();
    this.queue       = new Queue();

    this.init();
};


Player.prototype = {

    init: function() {
        this._eventListener();
        this._keyListener();
    },


    play: function() {
        this.isPlaying = true;
        this.progressBar.startRefreshInterval(this.player);
        this.player.play();
    },


    pause: function() {
        this.isPlaying = false;
        this.progressBar.stopRefreshInterval();
        this.player.pause();
    },


    // Player controls
    togglePlay: function() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    },


    stopPlayback: function() {
        this.pause();
        this.isPlaying = !this.isPlaying;
        this.player.currentTime = 0;
        this.progressBar.stopRefreshInterval();
        this.progressBar.resetProgressBar();

        window.app.trackPreview.setVisible(false);
        // OR this, but it doesn't keep in memory the current track (to think about)
        // this.player.src = "";
        // TODO : Make a real stop feature ...
    },


    fastForward: function(event) {
        if (event.ctrlKey) {
            this.player.currentTime += 30;
        } else {
            this.player.currentTime += 10;
        }

        this.progressBar.updateProgress(this.player);
    },


    rewind: function(event) {
        if (event.ctrlKey) {
            this.player.currentTime -= 30;
        } else {
            this.player.currentTime -= 10;
        }

        this.progressBar.updateProgress(this.player);
    },


    delayHideVolume: function() {
        var that = this;

        clearTimeout(this.volumeLockId);
        this.volumeLockId = setTimeout(function() {
            that.volumeBar.removeVisibilityLock();
            that.isVolumeLocked = false;
        }, 1500);
    },


    /* Volume control */
    volumeUp: function(event) {
        this.volumeBar.addVisibilityLock();

        if (!this.isVolumeLocked) { // TODO : put bool in volumeBar
            this.isVolumeLocked = true;
        }

        if (this.player.volume === 0) { // Un-muting player
            this.isMuted = false;
        }

        if (!event.ctrlKey) {
            if (this.player.volume < 1) {
                this.player.volume += 0.01;
            }
        } else {
            if (this.player.volume + 0.1 <= 1) {
                this.player.volume += 0.1;
            } else if (this.player.volume < 1) {
                this.player.volume += 0.01;
            }
        }

        this.player.volume = precisionRound(this.player.volume, 2);
        this.volumeBar.setVolume(this.player.volume * 100);
        this.volumeBar.updateVolume(this.ui.mute.image);
    },


    volumeDown: function(event) {
        if (!this.isVolumeLocked) {
            this.volumeBar.addVisibilityLock();
            this.isVolumeLocked = true;
        }

        if (!event.ctrlKey) {
            if (this.player.volume > 0) {
                this.player.volume -= 0.01;
            }
        } else {
            if (this.player.volume - 0.1 >= 0) {
                this.player.volume -= 0.1;
            } else if (this.player.volume > 0) {
                this.player.volume -= 0.01;
            }
        }

        this.player.volume = precisionRound(this.player.volume, 2);

        if (this.player.volume === 0) { // Muting player
            this.isMuted = true;
        }

        this.volumeBar.setVolume(this.player.volume * 100);
        this.volumeBar.updateVolume(this.ui.mute.image);
    },


    mute: function() {
        this.oldVolume = this.player.volume;
        this.player.volume = 0;
    },


    unmute: function() {
        this.player.volume = this.oldVolume;
        this.oldVolume = 0;
    },


    toggleMute: function(event) {
        if (event.target.id === "buttonMute" || event.target.id === "imageMute" || (event instanceof KeyboardEvent && event.ctrlKey)) {
            if (this.isMuted) {
                this.isMuted = !this.isMuted;
                this.unmute();
            } else {
                this.isMuted = !this.isMuted;
                this.mute();
            }

            if (this.player.volume === 0) { this.ui.mute.image.src = "/static/img/player/mute.svg"; }
            else { this.ui.mute.image.src = "/static/img/player/volume.svg"; }

            this.volumeBar.setVolume(this.player.getVolume() * 100);
            this.volumeBar.updateVolume(this.ui.mute.image);
        }
    },


    changeTrack: function(url) {
        this.stopPlayback();
        console.log(url);
        this.player.src = url;
        this.play();
    },


    toggleQueue: function(event) {
        if (event.ctrlKey || event.type === "click") {
            this.queue.toggleVisibilityLock();
        }
    },


    mouseMove: function(event) {
        // Updating the ProgressBar while user is moving the mouse
        if (this.progressBar.getIsDragging()) {
            this.progressBar.moveProgress(event, this.player);
            this.progressBar.addVisibilityLock();
            this.progressBar.timecodeProgressHover(event, this.player);
        } else if (this.progressBar.getIsMouseOver()) {
            this.progressBar.timecodeProgressHover(event, this.player);
        }

        if (this.volumeBar.getIsDragging()) {
            this.volumeBar.toggleVisibilityLock();
            this.volumeBar.moveVolume(event);
            this.setVolume(this.volumeBar.getVolume() / 100);
            this.volumeBar.updateVolume(this.ui.mute.image);
        }
    },


    // Click event on ProgressBar div
    mouseDown: function(event) {
        console.log(event.target);
        if (!this.progressBar.getIsDragging() &&
            (event.target.id === "progress" || event.target.id === "progressBar" || event.target.id === "progressThumb" ||
             event.target.tagName === "rect" || event.target.id === "moodbarThumb")) {
            this.progressBar.setIsDragging(true);
            this.progressBar.moveProgress(event, this.player);
            this.mute();
        }

        if (!this.volumeBar.getIsDragging() &&
            (event.target.id === "volume" || event.target.id === "volumeBar" || event.target.id === "volumeThumb")) {
            this.volumeBar.setIsDragging(true);
            this.volumeBar.moveVolume(event);
            this.volumeBar.toggleVisibilityLock();
            this.setVolume(this.volumeBar.getVolume() / 100);
            this.volumeBar.updateVolume(this.ui.mute.image);
        }
    },


    // Mouse events
    mouseUp: function() {
        // User released the ProgressBar thumb
        if (this.progressBar.getIsDragging()) {
            this.progressBar.removeVisibilityLock();
            this.progressBar.setIsDragging(false);
            this.unmute();
        }

        if (this.volumeBar.getIsDragging()) {
            this.volumeBar.setIsDragging(false);
            this.volumeBar.toggleVisibilityLock();
            this.volumeBar.updateVolume(this.ui.mute.image);
        }
    },


    mouseOver: function() {
        this.progressBar.setIsMouseOver(true);
    },


    mouseLeave: function() {
        this.progressBar.setIsMouseOver(false);
    },


    invertTimecode: function() {
        this.progressBar.invertTimecode(this.player);
    },


    _eventListener: function() {
        var that = this;

        this.player.addEventListener("ended", window.app.next.bind(window.app));
        this.player.addEventListener('loadedmetadata', function() {
            that.progressBar.init(that.player); // Initialize progressBar
            that.progressBar.getContainer().addEventListener("mouseover", that.mouseOver.bind(that));
            that.progressBar.getContainer().addEventListener("mouseleave", that.mouseLeave.bind(that));
            that.progressBar.getContainer().addEventListener("mousedown", that.mouseDown.bind(that));
            that.progressBar.getMoodbar().addEventListener("mousedown", that.mouseDown.bind(that));
            that.progressBar.getCurrentDuration().addEventListener("click", that.invertTimecode.bind(that));
            that.progressBar.getTotalDuration().addEventListener("click", that.invertTimecode.bind(that));
            window.addEventListener("mouseup", that.mouseUp.bind(that));
            window.addEventListener("mousemove", that.mouseMove.bind(that));
        });

        this.volumeBar.getContainer().addEventListener("mousedown", that.mouseDown.bind(this));
    },



    _keyListener: function() {
        var that = this;

        // Key pressed event
        document.addEventListener("keydown", function(event) {
            switch (event.keyCode) {
                case 32: // Space player
                    that.togglePlay();
                    break;
                case 37: // Left arrow
                    that.rewind(event);
                    break;
                case 38: // Up arrow
                    that.volumeUp(event);
                    break;
                case 39: // Right arrow
                    that.fastForward(event);
                    break;
                case 40: // Down arrow
                    that.volumeDown(event);
                    break;
                case 77: // m key (w/ ctrl)
                    that.toggleMute(event);
                    break;
                case 81:
                    that.toggleQueue(event);
                    break;
                default:
                    break;
            }
        });

        // Key released event
        document.addEventListener("keyup", function(event) {
            switch (event.keyCode) {
                case 38: // Up arrow
                    that.delayHideVolume();
                    break;
                case 40: // Down arrow
                    that.delayHideVolume();
                    break;
                default:
                    break;
            }
        });
    },

    // Class Getters and Setters
    getPlayer: function()                 { return this.player;             },
    getVolume: function()                 { return this.player.volume;      },
    getOldVolume: function()              { return this.oldVolume;          },
    getIsPlaying: function()              { return this.isPlaying;          },
    getIsLooping: function()              { return this.isLooping;          },
    getIsMuted: function()                { return this.isMuted;            },

    setVolume: function(volume)           { this.player.volume = volume;    },
    setCurrentTime: function(currentTime) { this.currentTime = currentTime; },
    setIsLooping: function(looping)       { this.isLooping = looping;       }
};
