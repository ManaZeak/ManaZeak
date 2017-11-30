/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Player class - handle song streaming client side, and std action on it             *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var Player = function(cookies) {
    this.cookies = cookies;

    this.player = document.getElementById("audioPlayer");

    this.isPlaying = false;
    this.isMuted   = false;
    this.loopingMode = false;

    this.oldVolume = 0;

    this.init();
};


Player.prototype = {

    init: function() {
        this.player.volume = 0.5; // TODO : init from global var in App
        this._eventListener();
    },


    play: function() {
        this.isPlaying = true;
        this.player.play();
    },


    pause: function() {
        this.isPlaying = false;
        this.player.pause();
    },


    // Player controls
    togglePlay: function() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    },


    stopPlayback: function() {
        this.pause();
        this.isPlaying = false;
        this.player.currentTime = 0;
        // OR this, but it doesn't keep in memory the current track (to think about)
        // this.player.src = "";
        // TODO : Make a real stop feature ...
    },


    fastForward: function(event) {
        if (event.ctrlKey) {
            window.app.fastForward(30);
        } else {
            window.app.fastForward(10);
        }
    },


    rewind: function(event) {
        if (event.ctrlKey) {
            window.app.rewind(30);
        } else {
            window.app.rewind(10);
        }
    },


    mute: function() {
        this.isMuted = true;
        this.oldVolume = this.player.volume;
        this.player.volume = 0;
    },


    unmute: function() {
        this.isMuted = false;
        this.player.volume = this.oldVolume;
    },


    changeTrack: function(url) {
        this.stopPlayback();
        this.player.src = url;
    },


    repeatTrack: function() {
        this.player.currentTime = 0;
    },


    _eventListener: function() {
        this.player.addEventListener("ended", window.app.next.bind(window.app));
    },


    // Class Getters and Setters
    getPlayer: function()                 { return this.player;             },
    getIsPlaying: function()              { return this.isPlaying;          },

    setIsMuted: function(muted)           { this.isMuted = muted;           },
    setVolume: function(volume)           { this.player.volume = volume;    }
};
