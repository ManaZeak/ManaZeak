var ProgressBar = function() {
    this.progressBar = {
        container: document.getElementById("progressBar"),
        current:   document.getElementById("progress"),
        thumb:     document.getElementById("progressThumb")
    };
    this.duration = {
        current: document.getElementById("currentDuration"),
        total:   document.getElementById("totalDuration"),
        hover:   document.getElementById("progressTimecodeHover")
    };

    this.refreshIntervalId = -1;

    this.isDragging = false;
    this.isMouseOver = false;
    this.isInverted = false;
};

ProgressBar.prototype = {
    init: function(track) {
        this.duration.current.innerHTML = "00:00";
        this.duration.total.innerHTML = secondsToTimecode(track.duration);
    },

    moveProgress: function(event, track) {
        var boundRect = this.progressBar.container.getBoundingClientRect();
        if (this.isDragging) {
            var distanceToLeftInPx = event.clientX - boundRect.left;
            var distanceToLeftInPr = (distanceToLeftInPx * 100) / boundRect.width;
            // OOB protection
            if (distanceToLeftInPr > 100) { distanceToLeftInPr = 100; } // TODO : next track if 100 %
            if (distanceToLeftInPr < 0) { distanceToLeftInPr = 0; }
            // Style assignation
            this.progressBar.current.style.width = distanceToLeftInPr + "%";
            this.progressBar.thumb.style.marginLeft = distanceToLeftInPr + "%";
            // Changing track currentTime
            track.currentTime = (track.duration * distanceToLeftInPr) / 100;
            // Updating progress bar -- /!\ Code under this while be trigger every sec due to setInterval(); in init();
            this.updateProgress(track);
        }
    },

    updateProgress: function(track) {
        var distanceToLeftBorder = (track.currentTime * 100) / track.duration;
        // Style assignation
        this.progressBar.current.style.width = distanceToLeftBorder + "%";
        this.progressBar.thumb.style.marginLeft = distanceToLeftBorder + "%";

        if (!this.isInverted) { // TODO : savoir quoi faire exactement
            this.duration.current.innerHTML = secondsToTimecode(track.currentTime);
            this.duration.total.innerHTML = secondsToTimecode(track.duration);
        } else {
            this.duration.current.innerHTML = secondsToTimecode(track.currentTime);
            this.duration.total.innerHTML = secondsToTimecode(track.duration - track.currentTime);
        }
    },

    timecodeProgressHover: function(event, track) {
        var boundRect = this.progressBar.container.getBoundingClientRect();
        var distanceToLeftInPx = event.clientX - boundRect.left;
        var distanceToLeftInPr = (distanceToLeftInPx * 100) / boundRect.width;
        // Avoid OOB
        if (distanceToLeftInPr > 100) { distanceToLeftInPr = 100; } // TODO : next track if 100 %
        if (distanceToLeftInPr < 0) { distanceToLeftInPr = 0; }

        var hoveredTimecode = secondsToTimecode((track.duration * distanceToLeftInPr) / 100);
        // We must convert back InPr to InPx ( distInPx = (boundRect.width * distanceToLeftInPr / 100) ) bc pixel size must be capped to progressBar bounds
        this.duration.hover.style.left = ((((boundRect.width * distanceToLeftInPr) / 100) - 30) * 100) / boundRect.width + "%";
        this.duration.hover.innerHTML = hoveredTimecode;
    },

    toggleRefreshInterval: function(track) {
        var that = this;

        if (this.refreshIntervalId === -1) {
            this.refreshIntervalId = setInterval(function() {
                that.updateProgress(track);
            }, 1000);
        } else {
            clearInterval(this.refreshIntervalId);
            this.refreshIntervalId = -1;
        }
    },

    stopRefreshInterval: function() {
        clearInterval(this.refreshIntervalId);
        this.refreshIntervalId = -1;
    },

    addVisibilityLock: function() {
        if (!this.duration.hover.className.match(/(?:^|\s)progressTimecodeHoverLocked(?!\S)/)) {
            this.duration.hover.className += "progressTimecodeHoverLocked";
        }
    },

    removeVisibilityLock: function() {
        if (this.duration.hover.className.match(/(?:^|\s)progressTimecodeHoverLocked(?!\S)/)) {
            this.duration.hover.className = this.duration.hover.className.replace(/(?:^|\s)progressTimecodeHoverLocked(?!\S)/g, '');
        }
    },

    invertTimecode: function(track) {
        if (!this.isInverted) {
            this.isInverted = !this.isInverted;
        } else {
            this.isInverted = !this.isInverted;
        }
    },

    /* Class Getters and Setters */
    getContainer: function()       { return this.progressBar.container; },
    getCurrentDuration: function() { return this.duration.current;      },
    getTotalDuration: function()   { return this.duration.total;        },
    getIsDragging: function()      { return this.isDragging;            },
    getIsMouseOver: function()     { return this.isMouseOver;           },

    setCurrentDuration: function(current) { this.duration.current = current; },
    setTotalDuration: function(total)     { this.duration.total = total;     },
    setIsDragging: function(isDragging)   { this.isDragging = isDragging;    },
    setIsMouseOver: function(isMouseOver) { this.isMouseOver = isMouseOver;  },
};
