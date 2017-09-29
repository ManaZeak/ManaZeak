var App = function() {
    // UI
    this.ui = {
        play: {
            button: document.getElementById("buttonPlay"),
            image:  document.getElementById("imagePlay")
        },
        stop: {
            button: document.getElementById("buttonStop"),
            image:  document.getElementById("imageStop")
        },
        mute: {
            button: document.getElementById("buttonMute"),
            image:  document.getElementById("imageMute")
        },
        repeat: {
            button: document.getElementById("buttonRepeat"),
            image:  document.getElementById("imageRepeat")
        },
        next: {
            button: document.getElementById("buttonNext"),
            image:  document.getElementById("imageNext")
        },
        previous: {
            button: document.getElementById("buttonPrevious"),
            image:  document.getElementById("imagePrevious")
        },
        queueExpander: {
            button: document.getElementById("queueExpander"),
            image:  document.getElementById("imageQueueExpander")
        },
        userExpander: {
            button:    document.getElementById("userExpander")
        }
    };

    // Objects
    this.player      = new Player();
    this.progressBar = new ProgressBar();
    this.volumeBar   = new VolumeBar();
    this.queue       = new Queue();
    this.menu        = new Menu();

    // IDs
    this.volumeLockId = -1;

    // Flags
    this.isVolumeLocked = false;

    // Cookies
    this.cookies = getCookies();

    this.init();

    /*
        TODO: addVisibilityLock in Utils
    */
};

App.prototype = {

    init: function() {
        this.keyListener(); // Loading shortcuts
        this.eventListener(); // Loading events

        // Getting user playlists
        var xmlhttp = new XMLHttpRequest();
        var that = this;

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                that.start(JSON.parse(this.responseText));
            }
        };

        xmlhttp.open("GET", "ajax/getPlaylists", true);
        xmlhttp.send();
    },


    start: function(playlists) {
        // User first connection : need too create the first library
        if (playlists.RESULT === 0) {
            var n = new Library(true, this.cookies);
        } else {
//            var tmp = new ListView(this.tracks);
        }
    },


    mouseMove: function(event) {
        // Updating the ProgressBar while user is moving the mouse
        if (this.progressBar.getIsDragging()) {
            this.progressBar.moveProgress(event, this.player.getPlayer());
            this.progressBar.addVisibilityLock();
            this.progressBar.timecodeProgressHover(event, this.player.getPlayer());
        }

        else if (this.progressBar.getIsMouseOver()) {
            this.progressBar.timecodeProgressHover(event, this.player.getPlayer());
        }

        if (this.volumeBar.getIsDragging()) {
            this.volumeBar.toggleVisibilityLock();
            this.volumeBar.moveVolume(event);
            this.player.setVolume(this.volumeBar.getVolume() / 100);
            this.volumeBar.updateVolume(this.ui.mute.image);
        }
    },


    // Click event on ProgressBar div
    mouseDown: function(event) {
        if (!this.progressBar.getIsDragging() &&
            (event.target.id === "progress" || event.target.id === "progressBar" || event.target.id === "progressThumb")) {
            this.progressBar.setIsDragging(true);
            this.progressBar.moveProgress(event, this.player.getPlayer());
            this.player.mute();
        }
        if (!this.volumeBar.getIsDragging() &&
            (event.target.id === "volume" || event.target.id === "volumeBar" || event.target.id === "volumeThumb")) {
            this.volumeBar.setIsDragging(true);
            this.volumeBar.moveVolume(event);
            this.volumeBar.toggleVisibilityLock();
            this.player.setVolume(this.volumeBar.getVolume() / 100);
            this.volumeBar.updateVolume(this.ui.mute.image);
        }
    },


    // Mouse events
    mouseUp: function() {
        // User released the ProgressBar thumb
        if (this.progressBar.getIsDragging()) {
            this.progressBar.removeVisibilityLock();
            this.progressBar.setIsDragging(false);
            this.player.unmute();
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


    // Player controls
    togglePlay: function() {
        this.player.togglePlay(this.ui.play.image);
        this.progressBar.toggleRefreshInterval(this.player.getPlayer());
    },


    toggleRepeat: function() {
        this.player.toggleRepeat();
    },


    stopPlayback: function() {
        this.player.stopPlayback();
        this.progressBar.updateProgress(this.player.getPlayer());
        this.progressBar.stopRefreshInterval();
        this.ui.play.image.src = "/static/img/play.svg";
    },


    toggleMute: function(event) {
        if (event.target.id === "buttonMute" || event.target.id === "imageMute" || (event instanceof KeyboardEvent && event.ctrlKey)) {
            this.player.toggleMute(this.volumeBar, this.ui.mute.image);
            this.volumeBar.setVolume(this.player.getVolume() * 100);
            this.volumeBar.updateVolume(this.ui.mute.image);
        }
    },


    next: function() {
        this.player.changeTrack("/static/audio/test.flac"); // New tracks to inject here
        this.player.stopPlayback();
        this.player.togglePlay();
    },


    previous: function() {
        this.player.changeTrack("/static/audio/test2.mp3"); // Old tracks to inject here
        this.player.stopPlayback();
        this.player.togglePlay();
    },


    rewind: function(event) {
        this.player.rewind(event.ctrlKey);
        this.progressBar.updateProgress(this.player.getPlayer());
    },


    fastForward: function(event) {
        this.player.fastForward(event.ctrlKey);
        this.progressBar.updateProgress(this.player.getPlayer());

    },


    volumeUp: function(event) {
        this.volumeBar.addVisibilityLock();
        if (!this.isVolumeLocked) { // TODO : put bool in volumeBar
            this.isVolumeLocked = true;
        }

        this.player.volumeUp(event.ctrlKey, this.volumeBar);

        this.volumeBar.setVolume(this.player.getVolume() * 100);
        this.volumeBar.updateVolume(this.ui.mute.image);
    },


    volumeDown: function(event) {
        if (!this.isVolumeLocked) {
            this.volumeBar.addVisibilityLock();
            this.isVolumeLocked = true;
        }

        this.player.volumeDown(event.ctrlKey, this.volumeBar);

        this.volumeBar.setVolume(this.player.getVolume() * 100);
        this.volumeBar.updateVolume(this.ui.mute.image);
    },


    delayHideVolume: function() {
        var that = this;

        clearTimeout(this.volumeLockId);
        this.volumeLockId = setTimeout(function() {
            that.volumeBar.removeVisibilityLock();
            that.isVolumeLocked = false;
        }, 1500);
    },


    toggleQueue: function(event) {
        if (event.ctrlKey || event.type === "click") {
            this.queue.toggleVisibilityLock();
        }
    },


    toggleMenu: function() {
        this.menu.toggleVisibilityLock();
    },


    invertTimecode: function() {
        this.progressBar.invertTimecode(this.player.getPlayer());
    },


    keyListener: function() {
        var that = this;

        // Key pressed event
        document.addEventListener("keydown", function(event) {
            switch (event.keyCode) {
                case 32: // Space bar
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


    eventListener: function() {
        var that = this;
        // Button event listeners
        this.ui.play.button.addEventListener("click", this.togglePlay.bind(this));
        this.ui.stop.button.addEventListener("click", this.stopPlayback.bind(this));
        this.ui.mute.button.addEventListener("click", this.toggleMute.bind(this));
        this.ui.repeat.button.addEventListener("click", this.toggleRepeat.bind(this));
        this.ui.next.button.addEventListener("click", this.next.bind(this));
        this.ui.previous.button.addEventListener("click", this.previous.bind(this));
        this.ui.queueExpander.button.addEventListener("click", this.toggleQueue.bind(this));
        this.ui.userExpander.button.addEventListener("click", this.toggleMenu.bind(this));

        this.player.getPlayer().addEventListener('loadedmetadata', function() {
            that.progressBar.init(that.player.getPlayer()); // Initialize progressBar
            that.progressBar.getContainer().addEventListener("mouseover", that.mouseOver.bind(that));
            that.progressBar.getContainer().addEventListener("mouseleave", that.mouseLeave.bind(that));
            that.progressBar.getContainer().addEventListener("mousedown", that.mouseDown.bind(that));
            that.progressBar.getCurrentDuration().addEventListener("click", that.invertTimecode.bind(that));
            that.progressBar.getTotalDuration().addEventListener("click", that.invertTimecode.bind(that));
            window.addEventListener("mouseup", that.mouseUp.bind(that));
            window.addEventListener("mousemove", that.mouseMove.bind(that));
        });

        this.volumeBar.getContainer().addEventListener("mousedown", that.mouseDown.bind(this));
    }
};
