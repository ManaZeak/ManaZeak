/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  FootBar class                                  *
 *                                                 *
 *  Handle FootBar and every components inside     *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

let FootBar = function() {

    this._createUI();
    this.trackPreview    = new TrackPreview(this.footBar);
    this.controls        = new Controls(this.controlsContainer);
    this.progressBar     = new ProgressBar(this.controlsContainer);
    this.playlistPreview = new PlaylistPreview(this.footBar);
    this.footBar.appendChild(this.controlsContainer);
    this._init();
};


FootBar.prototype = {

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : delayHideVolume (public)
     * class  : FootBar
     * desc   : Delay volume bar invisibility
     **/
    delayHideVolume: function() {
        this.controls.volumeBar.delayHideVolume();
    },


    /**
     * method : resetUI (public)
     * class  : FootBar
     * desc   : Reset TrackPreview and ProgressBar. TODO : option to close PlaylistPreview also
     **/
    resetUI: function() {
        this.trackPreview.resetTrackPreview();
        this.progressBar.resetProgressBar();
    },


    /**
     * method : volumeDown (public)
     * class  : FootBar
     * desc   : Updates VolumeBar with volume down
     **/
    volumeDown: function(event) {
        this.controls.volumeBar.volumeDown(event);
    },


    /**
     * method : volumeDown (public)
     * class  : FootBar
     * desc   : Updates VolumeBar with volume up
     **/
    volumeUp: function(event) {
        this.controls.volumeBar.volumeUp(event);
    },

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _addEntries (private)
     * class  : FootBar
     * desc   : Build UI elements
     **/
    _createUI: function() {
        this.footBar                     = document.createElement("DIV");
        this.controlsContainer           = document.createElement("DIV");
        this.progressContainer           = document.createElement("DIV");

        this.footBar.id                  = "footBar";
        this.controlsContainer.className = "mzk-controls-container";
    },


    /**
     * method : _init (private)
     * class  : FootBar
     * desc   : Listen to FootBar events
     **/
    _init: function() {
        this._eventListener();
    },


    /**
     * method : _eventListener (private)
     * class  : FootBar
     * desc   : FootBar event listeners
     **/
    _eventListener: function() {
        let that = this;

        window.app.addListener('stopPlayback', function() {
            that.progressBar.resetProgressBar();
        });
        window.app.addListener(['fastForward', 'rewind'], function() {
            that.progressBar.updateProgress(window.app.player.getPlayer());
        });
    },

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getFootBar: function() { return this.footBar; }

};
