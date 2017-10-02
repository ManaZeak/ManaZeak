/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  VolumeBar class - handle the volume bar depending on the player's volume           *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var VolumeBar = function() {
    this.volumeBar = {
        wrapper:   getById("volumeBarWrapper"),
        container: getById("volumeBar"),
        current:   getById("volume"),
        thumb:     getById("volumeThumb")
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
            if (this.volume === 0) { img.src = "/static/img/mute.svg"; }
            else { img.src = "/static/img/volume.svg"; }
        }
    },


    addVisibilityLock: function() {
        if (!this.volumeBar.wrapper.className.match(/(?:^|\s)volumeBarWrapperLocked(?!\S)/)) {
            this.volumeBar.wrapper.className += "volumeBarWrapperLocked";
        }
    },


    removeVisibilityLock: function() {
        if (this.volumeBar.wrapper.className.match(/(?:^|\s)volumeBarWrapperLocked(?!\S)/)) {
            this.volumeBar.wrapper.className = this.volumeBar.wrapper.className.replace(/(?:^|\s)volumeBarWrapperLocked(?!\S)/g, '');
        }
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
