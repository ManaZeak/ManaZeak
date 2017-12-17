/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  Player class                                   *
 *                                                 *
 *  Handle song streaming client side,             *
 *  and std action on it                           *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

let Player = function() {

    this.player    = document.getElementById("audioPlayer");
    this.isPlaying = false;
    this.isMuted   = false;
    this.oldVolume = 0;
    this.emptyURL  = "";

    this._init();
};


Player.prototype = {

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : isEmpty (public)
     * class  : Player
     * desc   : Test if player source is empty
     * return : {bool} true if src is empty
     **/
    isEmpty: function() {
        return this.player.src == this.emptyURL;
    },


    /**
     * method : togglePlay (public)
     * class  : Player
     * desc   : Switch on and off player playback depending on its current status
     **/
    togglePlay: function() {
        if (this.isPlaying) {
            this._pause();
        } else {
            this._play();
        }
    },


    /**
     * method : stopPlayback (public)
     * class  : Player
     * desc   : Stop player playback and reset player src
     **/
    stopPlayback: function() {
        this._pause();
        this.isPlaying  = false;
        this.player.src = "";
    },


    /**
     * method : mute (public)
     * class  : Player
     * desc   : Mute player and store old value
     **/
    mute: function() {
        this.isMuted       = true;
        this.oldVolume     = this.player.volume; // Store old volume for restoration on unmute
        this.player.volume = 0;
    },


    /**
     * method : unmute (public)
     * class  : Player
     * desc   : Unmute player and restore old value
     **/
    unmute: function() {
        this.isMuted       = false;
        this.player.volume = this.oldVolume;
    },


    /**
     * method : changeSource (public)
     * class  : Player
     * desc   : Change player source and stop playback
     * arg    : {string} url - Path to targeted track
     **/
    changeSource: function(url) {
        this.stopPlayback();
        this.player.src = url;
    },


    /**
     * method : repeatTrack (public)
     * class  : Player
     * desc   : Reset player current time and repeat the track
     **/
    repeatTrack: function() {
        this.player.currentTime = 0;

        if (!this.isPlaying) {
            this._play();
        }
    },

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _eventListener (private)
     * class  : Player
     * desc   : Player event listeners
     **/
    _eventListener: function() {
        let that = this;
        this.player.addEventListener("loadedmetadata", window.app.refreshUI.bind(window.app));
        this.player.addEventListener("ended", function() {
            that.isPlaying = false;
            window.app.next();
        });
    },


    /**
     * method : _init (private)
     * class  : Player
     * desc   : Init player volume, set/store player empty source and listen
     **/
    _init: function() {
        this.player.volume = 0.5; // TODO : init from global var in App os user settings
        this.player.src    = '';
        this.emptyURL      = this.player.src;
        this._eventListener();
    },


    /**
     * method : _pause (public)
     * class  : Player
     * desc   : Pause player playback
     **/
    _pause: function() {
        this.isPlaying = false;
        this.player.pause();
    },


    /**
     * method : _play (public)
     * class  : Player
     * desc   : Play player playback
     **/
    _play: function() {
        this.isPlaying = true;
        this.player.play();
    },

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getPlayer: function()       { return this.player;             },
    getIsPlaying: function()    { return this.isPlaying;          },
    getCurrentTime: function()  { return this.player.currentTime; },
    getDuration: function()     { return this.player.duration;    },

    setIsMuted: function(muted) { this.isMuted = muted;           },
    setVolume: function(volume) { this.player.volume = volume;    }

};
