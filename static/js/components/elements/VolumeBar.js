/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  VolumeBar class - handle the volume bar depending on the player's volume           *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var VolumeBar = function(container) {

    this.volumeBar = {
        wrapper:   document.createElement("DIV"),
        container: document.createElement("DIV"),
        current:   document.createElement("DIV"),
        thumb:     document.createElement("DIV")
    };

    this.volumeBar.wrapper.id = "volumeBarWrapper";
    this.volumeBar.container.id = "volumeBar";
    this.volumeBar.current.id = "volume";
    this.volumeBar.thumb.id = "volumeThumb";

    this.ui = {
        mute: {
            button: document.createElement("A"),
            image:  document.createElement("IMG")
        }
    };

    this.ui.mute.button.id = "buttonMute";
    this.ui.mute.image.id = "imageMute";

    this.ui.mute.image.src = "/static/img/player/volume.svg";

    this.ui.mute.button.appendChild(this.ui.mute.image);
    this.volumeBar.container.appendChild(this.volumeBar.current);
    this.volumeBar.container.appendChild(this.volumeBar.thumb);
    this.volumeBar.wrapper.appendChild(this.volumeBar.container);
    this.ui.mute.button.appendChild(this.volumeBar.wrapper);
    container.appendChild(this.ui.mute.button);

    this.volume = 100; // Volume value is an int between 0 and 100
    this.isDragging = false;

    this.volumeLockId = -1;
    this.isVolumeLocked = false;

    this.init();
};


VolumeBar.prototype = {

    init: function() {
        this.updateVolume(100);
        this._eventListener();
    },


    moveVolume: function(event) {
        var boundRect = this.volumeBar.container.getBoundingClientRect();
        var distanceToBottomInPx = boundRect.bottom - event.clientY;
        var distanceToBottomInPr = (distanceToBottomInPx * 100) / boundRect.height;
        // OOB protection
        if (distanceToBottomInPr > 100) { distanceToBottomInPr = 100; }
        if (distanceToBottomInPr < 0) { distanceToBottomInPr = 0; }
        // Style assignation
        this.volume = distanceToBottomInPr;
        this.volumeBar.current.style.height = distanceToBottomInPr + "%";
        this.volumeBar.thumb.style.bottom = distanceToBottomInPr + "%";
    },


    updateVolume: function(volume) {

        this.volume = volume;
        this.volumeBar.current.style.height = volume + "%";
        this.volumeBar.thumb.style.bottom = volume + "%";

        if (volume === 0) { this.ui.mute.image.src = "/static/img/player/mute.svg"; }
        else { this.ui.mute.image.src = "/static/img/player/volume.svg"; }
    },


    addVisibilityLock: function() {
	this.volumeBar.wrapper.classList.add('volumeBarWrapperLocked');
    },


    removeVisibilityLock: function() {
	this.volumeBar.wrapper.classList.remove('volumeBarWrapperLocked');
    },


    toggleVisibilityLock: function() {
        if (this.isDragging) {
            this.addVisibilityLock();
        } else {
            this.removeVisibilityLock();
        }
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
        this.addVisibilityLock();

        this.isVolumeLocked = true;
        window.app.player.setIsMuted(false);

        if (!event.ctrlKey) {
            window.app.adjustVolume(0.1);
        } else {
            window.app.adjustVolume(0.01);
        }
    },


    volumeDown: function(event) {
        this.addVisibilityLock();

        this.isVolumeLocked = true;
        window.app.player.setIsMuted(false);

        if (!event.ctrlKey) {
            window.app.adjustVolume(-0.1);
        } else {
            window.app.adjustVolume(-0.01);
        }
    },


    mouseMove: function(event) {

        if (this.isDragging) {
            this.toggleVisibilityLock();
            this.moveVolume(event);
            window.app.setVolume(this.volume / 100);
        }
    },


    mouseDown: function(event) {
        //TODO: fix this
        if (!this.isDragging &&
            (event.target.id === "volume" || event.target.id === "volumeBar" || event.target.id === "volumeThumb")) {
            this.isDragging = true;
            this.moveVolume(event);
            this.toggleVisibilityLock();
            window.app.setVolume(this.volume / 100);
        }
    },


    // Mouse events
    mouseUp: function() {
        if (this.isDragging) {
            this.isDragging = false;
            this.toggleVisibilityLock();
            this.updateVolume(this.volume);
        }
    },

    _eventListener: function() {
        var that = this;

        this.ui.mute.button.addEventListener("click", window.app.toggleMute.bind(window.app));

        window.app.addListener('setVolume', function() {
            that.updateVolume(window.app.player.getPlayer().volume * 100);
        });

        window.addEventListener("mousemove", this.mouseMove.bind(this));
        window.addEventListener("mouseup", this.mouseUp.bind(this));
        this.volumeBar.container.addEventListener("mousedown", that.mouseDown.bind(this));
    },


    // Class Getters and Setters
    getContainer: function()            { return this.volumeBar.container; },
    getVolume: function()               { return this.volume;              },
    getIsDragging: function()           { return this.isDragging;          },

    setVolume: function(volume)         { this.volume = volume;            },
    setIsDragging: function(isDragging) { this.isDragging = isDragging;    }
};
