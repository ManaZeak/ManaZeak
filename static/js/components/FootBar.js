/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  PlaylistBar class - handle the playlist bar                                        *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let FootBar = function() {

    this.footBar = document.createElement("DIV");

    this.controlsContainer = document.createElement("DIV");
    this.progressContainer = document.createElement("DIV");

    this.footBar.id                  = "footBar";
    this.controlsContainer.className = "mzk-controls-container";

    this.trackPreview    = new TrackPreview(this.footBar);
    this.controls        = new Controls(this.controlsContainer);
    this.playlistPreview = new PlaylistPreview(this.footBar);
    this.progressBar     = new ProgressBar(this.controlsContainer);

    this.footBar.appendChild(this.controlsContainer);

    this._init();
};


FootBar.prototype = {

    _init: function() {
        this._eventListener();
    },


    _eventListener: function() {
        let that = this;

        window.app.addListener('stopPlayback', function() {
            that.progressBar.resetProgressBar();
        });
        window.app.addListener(['fastForward', 'rewind'], function() {
            that.progressBar.updateProgress(window.app.player.getPlayer());
        });
    },


    volumeUp: function(event) {
        this.controls.volumeBar.volumeUp(event);
    },


    volumeDown: function(event) {
        this.controls.volumeBar.volumeDown(event);
    },


    delayHideVolume: function() {
        this.controls.volumeBar.delayHideVolume();
    },


    getFootBar: function() { return this.footBar; }
};
