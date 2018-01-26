/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  VolumeBar class                                *
 *                                                 *
 *  Handle the volume bar depending on the         *
 *  player's volume                                *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

import { addVisibilityLock, removeVisibilityLock, toggleVisibilityLock } from '../../../utils/Utils.js'
import MzkObject from '../../../core/MzkObject.js'
import Shortcut from '../../../utils/Shortcut.js'

class VolumeBar extends MzkObject {

    constructor(container) {
        super();
        this.isDragging   = false;
        this.volumeLockId = -1;
        this._createUI(container);
        this._init();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : delayHideVolume (public)
     * class  : VolumeBar
     * desc   : Delay volume bar invisibility
     **/
    delayHideVolume() {
        let that = this;

        window.clearTimeout(this.volumeLockId);
        addVisibilityLock(that.volumeBar.wrapper);
        this.volumeLockId = window.setTimeout(function() {
            removeVisibilityLock(that.volumeBar.wrapper);
        }, 1500);
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : VolumeBar
     * desc   : Build UI elements
     * arg    : {object} container - The VolumeBar container
     **/
    _createUI(container) {
        this.ui        = {
            mute: {
                button: document.createElement("A"),
                image:  document.createElement("IMG")
            }
        };
        this.volumeBar = {
            wrapper:    document.createElement("DIV"),
            container:  document.createElement("DIV"),
            current:    document.createElement("DIV"),
            thumb:      document.createElement("DIV")
        };

        this.volumeBar.wrapper.id   = "volumeBarWrapper";
        this.volumeBar.container.id = "volumeBar";
        this.volumeBar.current.id   = "volume";
        this.volumeBar.thumb.id     = "volumeThumb";
        this.ui.mute.button.id      = "buttonMute";
        this.ui.mute.image.id       = "imageMute";
        this.ui.mute.image.src      = "/static/img/player/volume.svg";

        this.ui.mute.button.appendChild(this.ui.mute.image);
        this.volumeBar.container.appendChild(this.volumeBar.current);
        this.volumeBar.container.appendChild(this.volumeBar.thumb);
        this.volumeBar.wrapper.appendChild(this.volumeBar.container);
        this.ui.mute.button.appendChild(this.volumeBar.wrapper);

        container.appendChild(this.ui.mute.button);
    }


    /**
     * method : _eventListener (private)
     * class  : VolumeBar
     * desc   : VolumeBar event listeners
     **/
    _eventListener() {
        let that = this;
        this.ui.mute.image.addEventListener("click", function() {
            window.app.toggleMute();
        });
        this.volumeBar.container.addEventListener("mousedown", that._mouseDown.bind(this));
        window.addEventListener("mousemove", this._mouseMove.bind(this));
        window.addEventListener("mouseup", this._mouseUp.bind(this));
        window.app.listen('setVolume', function() {
            that._updateVolume(window.app.getVolume());
        });
    }


    /**
     * method : _init (private)
     * class  : VolumeBar
     * desc   : Init default volume, set/store player empty source and listen
     **/
    _init() {
        this._updateVolume(window.app.getVolume());
        this._eventListener();
        this._keyListener();
    }


    /**
     * method : _eventListener (private)
     * class  : VolumeBar
     * desc   : VolumeBar event listeners
     **/
    _keyListener() {
        let that = this;
        this.addShortcut(new Shortcut('keyup', 'ArrowUp', function() { that.delayHideVolume(); }));
        this.addShortcut(new Shortcut('keyup', 'ArrowDown', function() { that.delayHideVolume(); }));
    }


    /**
     * method : _mouseDown (private)
     * class  : VolumeBar
     * desc   : Action on mouse down event
     * arg    : {object} event - MouseEvent
     **/
    _mouseDown(event) {
        if (!this.isDragging &&
            (event.target.id === "volume" || event.target.id === "volumeBar" || event.target.id === "volumeThumb")) {
            this.isDragging = true;
            this._moveVolume(event);
            toggleVisibilityLock(this.volumeBar.wrapper);
        }
    }


    /**
     * method : _mouseMove (private)
     * class  : VolumeBar
     * desc   : Action on mouse move event
     * arg    : {object} event - MouseEvent
     **/
    _mouseMove(event) {
        if (this.isDragging) {
            this._moveVolume(event);
        }
    }


    /**
     * method : _mouseUp (private)
     * class  : VolumeBar
     * desc   : Action on mouse up event
     **/
    _mouseUp() {
        if (this.isDragging) {
            this.isDragging = false;
            toggleVisibilityLock(this.volumeBar.wrapper);
        }
    }


    /**
     * method : _moveVolume (private)
     * class  : VolumeBar
     * desc   : Updates UI volume according to event location
     * arg    : {object} event - MouseEvent
     **/
    _moveVolume(event) {
        let boundRect                       = this.volumeBar.container.getBoundingClientRect();
        let distanceToBottomInPx            = boundRect.bottom - event.clientY;
        let distanceToBottomInPr            = (distanceToBottomInPx * 100) / boundRect.height;
        // OOB protection
        if (distanceToBottomInPr > 100) { distanceToBottomInPr = 100; }
        if (distanceToBottomInPr < 0)   { distanceToBottomInPr = 0;   }

        this.volumeBar.current.style.height = distanceToBottomInPr + "%";
        this.volumeBar.thumb.style.bottom   = distanceToBottomInPr + "%";
        window.app.setVolume(distanceToBottomInPr / 100);
    }


    /**
     * method : _updateVolume (private)
     * class  : VolumeBar
     * desc   : Updates volume to a given value
     * arg    : {int} volume - The volume to set
     **/
    _updateVolume(volume) {
        volume                              *= 100;
        this.volumeBar.current.style.height  = volume + "%";
        this.volumeBar.thumb.style.bottom    = volume + "%";

        if (volume === 0) {
            this.ui.mute.image.src           = "/static/img/player/mute.svg";
        }

        else if (volume > 0 && volume < 66) {
            this.ui.mute.image.src           = "/static/img/player/volume-half.svg";
        }

        else {
            this.ui.mute.image.src           = "/static/img/player/volume.svg";
        }
    }

}

export default VolumeBar