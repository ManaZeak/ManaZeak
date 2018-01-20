/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  FootBar class                                  *
 *                                                 *
 *  Handle FootBar and every components inside     *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class FootBar extends MzkObject {
    constructor() {
        super();
        this._createUI();
        this.trackPreview    = new TrackPreview(this.footBar);
        this.controls        = new Controls(this.controlsContainer);
        this.progressBar     = new ProgressBar(this.controlsContainer);
        this.playlistPreview = new PlaylistPreview(this.footBar);
        this.footBar.appendChild(this.controlsContainer);
        this._eventListener();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : resetUI (public)
     * class  : FootBar
     * desc   : Reset TrackPreview and ProgressBar. TODO : option to close PlaylistPreview also
     **/
    resetUI() {
        this.trackPreview.resetTrackPreview();
        this.progressBar.resetProgressBar();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _addEntries (private)
     * class  : FootBar
     * desc   : Build UI elements
     **/
    _createUI() {
        this.footBar                     = document.createElement("DIV");
        this.controlsContainer           = document.createElement("DIV");
        this.progressContainer           = document.createElement("DIV");

        this.footBar.id                  = "footBar";
        this.controlsContainer.className = "mzk-controls-container";
    }


    /**
     * method : _eventListener (private)
     * class  : FootBar
     * desc   : FootBar event listeners
     **/
    _eventListener() {
        let that = this;

        window.app.listen('stopPlayback', this.resetUI.bind(this));
        window.app.listen(['fastForward', 'rewind'], function() {
            that.progressBar.updateProgress(window.app.player.getPlayer());
        });
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getFootBar() { return this.footBar; }

}
