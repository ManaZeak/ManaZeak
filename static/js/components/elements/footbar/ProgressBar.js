/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  ProgressBar class                              *
 *                                                 *
 *  Handle the progress bar depending on current   *
 *  track in player                                *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

import { secondsToTimecode, addVisibilityLock, removeVisibilityLock } from '../../../utils/Utils.js'
import MzkObject from '../../../core/MzkObject.js'

class ProgressBar extends MzkObject {

    constructor(container) {
        super();
        this.refreshIntervalId = -1;
        this.isDragging        = false;
        this.isMouseOver       = false;
        this.isInverted        = false;
        this._createUI(container);
        this._init();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : refreshInterval (public)
     * class  : ProgressBar
     * desc   : Start refresh interval on track
     * arg    : {object} track - The track to update progress from
     **/
    refreshInterval(track) {
        let that = this;

        this._stopRefreshInterval();
        this.refreshIntervalId = window.setInterval(function () {
            that.updateProgress(track);
        }, 50); // Firing an updateProgress every 50ms to appear smooth on moodBar
    }


    /**
     * method : resetProgressBar (public)
     * class  : ProgressBar
     * desc   : Set ProgressBar to default
     **/
    resetProgressBar () {
        this.duration.current.innerHTML         = "--:--";
        this.duration.total.innerHTML           = "--:--";
        this.duration.hover.innerHTML           = "--:--";

        this.progressBar.current.style.width    = 0 + "%";
        this.progressBar.thumb.style.marginLeft = 0 + "%";

        if (this.moodbar.thumb) {
            this.moodbar.thumb.style.marginLeft = 0 + "%";
        }

        this._stopRefreshInterval();
    }


    /**
     * method : setMoodbarProgress (public)
     * class  : ProgressBar
     * desc   : Set moodbar container/thumb
     **/
    setMoodbarProgress() {
        this.moodbar.container = document.getElementById("moodbar");
        this.moodbar.thumb     = document.getElementById("moodbarThumb");
    }


    /**
     * method : updateProgress (public)
     * class  : ProgressBar
     * desc   : Update ProgressBar on track
     * arg    : {object} track - The track to update progress from
     **/
    updateProgress(track) {
        let distanceToLeftBorder                = (track.currentTime * 100) / track.duration;
        this.progressBar.current.style.width    = distanceToLeftBorder + "%";
        this.progressBar.thumb.style.marginLeft = distanceToLeftBorder + "%";
        this.moodbar.thumb.style.marginLeft     = distanceToLeftBorder + "%";

        if (!this.isInverted) {
            this.duration.current.innerHTML     = secondsToTimecode(track.currentTime);
            this.duration.total.innerHTML       = secondsToTimecode(track.duration);
        }

        else {
            this.duration.current.innerHTML     = secondsToTimecode(track.currentTime);
            this.duration.total.innerHTML       = "-" + secondsToTimecode(track.duration - track.currentTime);
        }
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : ProgressBar
     * desc   : Build UI elements
     * arg    : {object} container - The ProgressBar container
     **/
    _createUI(container) {
        this.container   = document.createElement("DIV");
        this.progressBar = {
            container:     document.createElement("DIV"),
            current:       document.createElement("DIV"),
            thumb:         document.createElement("DIV")
        };
        this.duration    = {
            current:       document.createElement("SPAN"),
            total:         document.createElement("SPAN"),
            hover:         document.createElement("DIV")
        };

        this.moodbar     = {
            container:     null,
            thumb:         null
        };

        this.container.id             = "progressBarWrapper";
        this.progressBar.container.id = "progressBar";
        this.progressBar.current.id   = "progress";
        this.progressBar.thumb.id     = "progressThumb";
        this.duration.current.id      = "currentDuration";
        this.duration.total.id        = "totalDuration";
        this.duration.hover.id        = "progressTimecodeHover";

        this.progressBar.container.appendChild(this.progressBar.current);
        this.progressBar.container.appendChild(this.progressBar.thumb);
        this.progressBar.container.appendChild(this.duration.hover);
        this.container.appendChild(this.duration.current);
        this.container.appendChild(this.progressBar.container);
        this.container.appendChild(this.duration.total);

        container.appendChild(this.container);
    }


    /**
     * method : _eventListener (private)
     * class  : ProgressBar
     * desc   : ProgressBar event listeners
     **/
    _eventListener() {
        let that = this;
        this.progressBar.container.addEventListener("mouseover", function () { that.isMouseOver = true; });
        this.progressBar.container.addEventListener("mouseleave", function () { that.isMouseOver = false; });
        this.duration.current.addEventListener("click", this._invertTimecode.bind(this));
        this.duration.total.addEventListener("click", this._invertTimecode.bind(this));
        window.addEventListener("mousemove", this._mouseMove.bind(this));
        window.addEventListener("mouseup", this._mouseUp.bind(this));
        window.addEventListener("mousedown", this._mouseDown.bind(this));
        window.app.listen('playerLoadedMetadata', function() {
            that.refreshInterval(window.app.player.getPlayer());
        });
        window.app.listen('changeTrack', function() {
            that.resetProgressBar();
        });
        window.app.listen('changeView', function() {
            that.setMoodbarProgress();
        });
    }


    /**
     * method : _init (private)
     * class  : ProgressBar
     * desc   : Creating moodbar, setting timecodes and listen
     **/
    _init() {
        this.duration.current.innerHTML = "--:--";
        this.duration.total.innerHTML   = "--:--";
        this._eventListener();
    }


    /**
     * method : _invertTimecode (private)
     * class  : ProgressBar
     * desc   : Invert timecodes
     **/
    _invertTimecode() {
        this.isInverted = !this.isInverted;
    }


    /**
     * method : _mouseDown (private)
     * class  : ProgressBar
     * desc   : Action on mouse down event
     * arg    : {object} event - MouseEvent
     **/
    _mouseDown(event) {
        //TODO: Clean this shit up
        if (!this.isDragging && (event.target.id === "progress" || event.target.id === "progressBar" || event.target.id === "progressThumb")) {
            this.isDragging          = true;
            this._stopRefreshInterval();
            this._moveProgress(event, window.app.player.getPlayer());
            window.app.mute();
        }

        else if (!this.isDragging && (event.target.id === "moodbar" || event.target.tagName === "rect" || event.target.id === "moodbarThumb")) {
            this.isDragging          = true;
            this.isDraggingOnMoodbar = true;
            this._stopRefreshInterval();
            this._moveProgress(event, window.app.player.getPlayer());
            window.app.mute();
        }
    }


    /**
     * method : _mouseMove (private)
     * class  : ProgressBar
     * desc   : Action on mouse move event
     * arg    : {object} event - MouseEvent
     **/
    _mouseMove(event) {
        if (this.isDragging) { // Updating the ProgressBar while user is moving the mouse
            this._moveProgress(event, window.app.player.getPlayer());
            addVisibilityLock(this.duration.hover);
            this._timecodeProgressHover(event, window.app.player.getPlayer());
        }

        else if (this.isMouseOver) {
            this._timecodeProgressHover(event, window.app.player.getPlayer());
        }
    }


    /**
     * method : _mouseUp (private)
     * class  : ProgressBar
     * desc   : Action on mouse up event
     **/
    _mouseUp() {
        if (this.isDragging) { // User released the ProgressBar thumb
            this.isDragging          = false;
            this.isDraggingOnMoodbar = false;

            this.refreshInterval(window.app.player.getPlayer());
            removeVisibilityLock(this.duration.hover);
            window.app.unmute();
        }
    }


    /**
     * method : _moveProgress (private)
     * class  : ProgressBar
     * desc   : Updates UI progress according to event location
     * arg    : {object} event - MouseEvent
     *        : {object} track - The current track in player to update
     **/
    _moveProgress(event, track) {
        let boundRect = 0;

        if (this.isDraggingOnMoodbar) {
            boundRect = this.moodbar.container.getBoundingClientRect();
        }

        else {
            boundRect = this.progressBar.container.getBoundingClientRect();
        }

        if (this.isDragging) {
            let distanceToLeftInPx = event.clientX - boundRect.left;
            let distanceToLeftInPr = (distanceToLeftInPx * 100) / boundRect.width;
            // OOB protection
            if (distanceToLeftInPr > 100) { distanceToLeftInPr = 100; }
            if (distanceToLeftInPr < 0)   { distanceToLeftInPr = 0;   }
            // Style assignation
            this.progressBar.current.style.width    = distanceToLeftInPr + "%";
            this.progressBar.thumb.style.marginLeft = distanceToLeftInPr + "%";
            this.moodbar.thumb.style.marginLeft     = distanceToLeftInPr + "%";
            // Changing track currentTime
            track.currentTime = (track.duration * distanceToLeftInPr) / 100;
            // Updating progress player -- /!\ Code under this while be trigger every sec due to setInterval() in init();
            this.updateProgress(track);
        }
    }


    /**
     * method : _stopRefreshInterval (private)
     * class  : ProgressBar
     * desc   : Clear refresh interval
     **/
    _stopRefreshInterval() {
        window.clearInterval(this.refreshIntervalId);
        this.refreshIntervalId = null;
    }


    /**
     * method : _timecodeProgressHover (private)
     * class  : ProgressBar
     * desc   : Display pointer's duration on hover ProgressBar
     * arg    : {object} event - MouseEvent
     *          {object} track - The track that aggro ProgressBar
     **/
    _timecodeProgressHover(event, track) {
        let boundRect                  = this.progressBar.container.getBoundingClientRect();
        let distanceToLeftInPx         = event.clientX - boundRect.left;
        let distanceToLeftInPr         = (distanceToLeftInPx * 100) / boundRect.width;
        // Avoid OOB
        if (distanceToLeftInPr > 100) { distanceToLeftInPr = 100; }
        if (distanceToLeftInPr < 0)   { distanceToLeftInPr = 0;   }

        let hoveredTimecode            = secondsToTimecode((track.duration * distanceToLeftInPr) / 100);
        // We must convert back InPr to InPx ( distInPx = (boundRect.width * distanceToLeftInPr / 100) ) bc pixel size must be capped to progressBar bounds
        this.duration.hover.style.left = ((((boundRect.width * distanceToLeftInPr) / 100) - 30) * 100) / boundRect.width + "%";
        this.duration.hover.innerHTML  = hoveredTimecode;
    }

}

export default ProgressBar