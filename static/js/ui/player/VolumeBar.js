/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  VolumeBar class - handle the volume bar depending on the player's volume           *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var VolumeBar = function() {
    this.volumeBar = {
        wrapper:   document.getElementById("volumeBarWrapper"),
        container: document.getElementById("volumeBar"),
        current:   document.getElementById("volume"),
        thumb:     document.getElementById("volumeThumb")
    };
    this.volume = 100; // Volume value is an int between 0 and 100
    this.isDragging = false;


    this.init();
};


VolumeBar.prototype = {

    init: function() {
        this.updateVolume();
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


    updateVolume: function(img) {
        this.volumeBar.current.style.height = this.volume + "%";
        this.volumeBar.thumb.style.bottom = this.volume + "%";

        if (img) {
            if (this.volume === 0) { img.src = "/static/img/player/mute.svg"; }
            else { img.src = "/static/img/player/volume.svg"; }
        }
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


    // Class Getters and Setters
    getContainer: function()            { return this.volumeBar.container; },
    getVolume: function()               { return this.volume;              },
    getIsDragging: function()           { return this.isDragging;          },

    setVolume: function(volume)         { this.volume = volume;            },
    setIsDragging: function(isDragging) { this.isDragging = isDragging;    }
};
