/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  Player class                                   *
 *                                                 *
 *  Handle song streaming client side,             *
 *  and std action on it                           *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

import { precisionRound } from '../utils/Utils.js'

class Player {

    constructor() {
        this.player    = document.createElement("AUDIO");

        this.isPlaying = false;
        this.isMuted   = false;
        this.oldVolume = 0;
        this.emptyURL  = "";
        this.trackId   = -1;
        this._init();

        document.body.insertBefore(this.player, document.body.firstChild);
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : changeSource (public)
     * class  : Player
     * desc   : Change player source and stop playback
     * arg    : {string} url - Path to targeted track
     *        : {int}     id - The associated ID
     **/
    changeSource(url, id) {
        this.trackId    = id;
        this.stopPlayback();
        this.player.src = url;
    }


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
     * method : mute (public)
     * class  : Player
     * desc   : Mute player and store old value
     **/
    mute() {
        this.isMuted       = true;
        this.oldVolume     = this.player.volume; // Store old volume for restoration on unmute
        this.player.volume = 0;
        window.localStorage.setItem('mzk-volume', this.player.volume)
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


    /**
     * method : setVolume (public)
     * class  : Player
     * desc   : Set Player volume to a given value
     * arg    : {float} volume - Volume between 0 and 1
     **/
    setVolume(volume) {
        if (volume > 1) {
            volume = 1;
        }

        else if (volume < 0) {
            volume = 0;
        }

        this.player.volume = precisionRound(volume, 2);
        window.localStorage.setItem('mzk-volume', this.player.volume)
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
        this.trackId = -1;
    }


    /**
     * method : togglePlay (public)
     * class  : Player
     * desc   : Switch on and off player playback depending on its current status
     **/
    togglePlay() {
        if (this.isPlaying) {
            this._pause();
        }

        else {
            this._play();
        }
    }


    /**
     * method : unmute (public)
     * class  : Player
     * desc   : Unmute player and restore old value
     **/
    unmute() {
        this.isMuted       = false;
        this.player.volume = this.oldVolume;
        window.localStorage.setItem('mzk-volume', this.player.volume)
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _eventListener (private)
     * class  : Player
     * desc   : Player event listeners
     **/
    _eventListener() {
        let that = this;
        this.player.addEventListener("loadedmetadata", function() {
            window.app.playerLoadedMetadata();
        });
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
        this.player.volume = window.localStorage.getItem('mzk-volume') ?
                                window.localStorage.getItem('mzk-volume') :
                                (function () {
                                    window.localStorage.setItem('mzk-volume', 1); // 0 : off, 1 : random, 2: shuffle
                                    return 1;
                                })();
        this.emptyURL      = '';
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
    getSourceID()     { return this.trackId;            }
    getVolume()       { return this.player.volume;      }

}

export default Player