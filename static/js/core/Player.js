/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Player class - handle song streaming client side, and std action on it             *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let Player = function(cookies) {
    this.cookies = cookies;
    this.player = document.getElementById("audioPlayer");

    this.isPlaying   = false;
    this.isMuted     = false;
    this.oldVolume   = 0;

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

        if (!this.isPlaying) {
            this.play();
        }
    },


    _eventListener: function() {
        let that = this;
        this.player.addEventListener("loadedmetadata", window.app.refreshUI.bind(window.app));
        this.player.addEventListener("ended", function() {
            that.isPlaying = false;
            window.app.next();
        });
    },


    // Class Getters and Setters
    getPlayer: function()                 { return this.player;             },
    getIsPlaying: function()              { return this.isPlaying;          },
    getCurrentTime: function()            { return this.player.currentTime  },
    getDuration: function()               { return this.player.duration     },

    setIsMuted: function(muted)           { this.isMuted = muted;           },
    setVolume: function(volume)           { this.player.volume = volume;    }
};
