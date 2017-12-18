/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  Player class                                   *
 *                                                 *
 *  Handle song streaming client side,             *
 *  and std action on it                           *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class Player {
    constructor() {

        this.player    = document.getElementById("audioPlayer");
        this.isPlaying = false;
        this.isMuted   = false;
        this.oldVolume = 0;
        this.emptyURL  = "";

        this._init();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : isEmpty (public)
     * class  : Player
     * desc   : Test if player source is empty
     * return : {bool} true if src is empty
     **/
    isEmpty() {
        return this.player.src == this.emptyURL;
    }


    /**
     * method : togglePlay (public)
     * class  : Player
     * desc   : Switch on and off player playback depending on its current status
     **/
    togglePlay() {
        if (this.isPlaying) { this._pause(); }
        else                { this._play();  }
    }


    /**
     * method : stopPlayback (public)
     * class  : Player
     * desc   : Stop player playback and reset player src
     **/
    stopPlayback() {
        this._pause();
        this.isPlaying  = false;
        this.player.src = "";
    }


    /**
     * method : mute (public)
     * class  : Player
     * desc   : Mute player and store old value
     **/
    mute() {
        this.isMuted       = true;
        this.oldVolume     = this.player.volume; // Store old volume for restoration on unmute
        this.player.volume = 0;
    }


    /**
     * method : unmute (public)
     * class  : Player
     * desc   : Unmute player and restore old value
     **/
    unmute() {
        this.isMuted       = false;
        this.player.volume = this.oldVolume;
    }


    /**
     * method : changeSource (public)
     * class  : Player
     * desc   : Change player source and stop playback
     * arg    : {string} url - Path to targeted track
     **/
    changeSource(url) {
        this.stopPlayback();
        this.player.src = url;
    }


    /**
     * method : repeatTrack (public)
     * class  : Player
     * desc   : Reset player current time and repeat the track
     **/
    repeatTrack() {
        this.player.currentTime = 0;

        if (!this.isPlaying) {
            this._play();
        }
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _eventListener (private)
     * class  : Player
     * desc   : Player event listeners
     **/
    _eventListener() {
        let that = this;
        this.player.addEventListener("loadedmetadata", window.app.refreshUI.bind(window.app));
        this.player.addEventListener("ended", function() {
            that.isPlaying = false;
            window.app.next();
        });
    }


    /**
     * method : _init (private)
     * class  : Player
     * desc   : Init player volume, set/store player empty source and listen
     **/
    _init() {
        this.player.volume = 0.5; // TODO : init from global var in App os user settings
        this.player.src    = '';
        this.emptyURL      = this.player.src;
        this._eventListener();
    }


    /**
     * method : _pause (private)
     * class  : Player
     * desc   : Pause player playback
     **/
    _pause() {
        this.isPlaying = false;
        this.player.pause();
    }


    /**
     * method : _play (private)
     * class  : Player
     * desc   : Play player playback
     **/
    _play() {
        this.isPlaying = true;
        this.player.play();
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getPlayer()       { return this.player;             }
    getIsPlaying()    { return this.isPlaying;          }
    getCurrentTime()  { return this.player.currentTime; }
    getDuration()     { return this.player.duration;    }

    setIsMuted(muted) { this.isMuted = muted;           }
    setVolume(volume) { this.player.volume = volume;    }

}
