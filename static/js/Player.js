/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Player class - handle song streaming client side, and std action on it             *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var Player = function() {
    this.player = document.getElementById("audioPlayer");
    this.oldVolume = 0;

    this.isPlaying = false;
    this.isMuted   = false;
    this.isLooping = false;

    this.init();
};


Player.prototype = {

    init: function() {

    },


    changeTrack: function(url) {
        this.player.src = url;
    },


    togglePlay: function(img) {
        if (this.isPlaying) {
            this.isPlaying = !this.isPlaying;
            this.player.pause();

            if (img) { img.src = "/static/img/play.svg"; }
        } else {
            this.isPlaying = !this.isPlaying;
            this.player.play();

            if (img) { img.src = "/static/img/pause.svg"; }
        }
    },


    stopPlayback: function() {
        this.player.pause();
        this.isPlaying = !this.isPlaying;
        this.player.currentTime = 0;
        // OR this, but it doesn't keep in memory the current track (to think about)
        // this.player.src = "";
        // TODO : Make a real stop feature ...
    },


    fastForward: function(ctrl) {
        if (ctrl) {
            this.player.currentTime += 30;
        } else {
            this.player.currentTime += 10;
        }
    },


    rewind: function(ctrl) {
        if (ctrl) {
            this.player.currentTime -= 30;
        } else {
            this.player.currentTime -= 10;
        }
    },


    /* Volume control */
    mute: function() {
        this.oldVolume = this.player.volume;
        this.player.volume = 0;
    },


    unmute: function() {
        this.player.volume = this.oldVolume;
        this.oldVolume = 0;
    },


    toggleMute: function(img) { // img not mandatory
        if (this.isMuted) {
            this.isMuted = !this.isMuted;
            this.unmute();
        } else {
            this.isMuted = !this.isMuted;
            this.mute();
        }

        if (img) {
            if (this.player.volume === 0) { img.src = "/static/img/mute.svg"; }
            else { img.src = "/static/img/volume.svg"; }
        }
    },


    volumeDown: function(ctrl, volumeBar) {
        if (!ctrl) {
            if (this.player.volume > 0) {
                this.player.volume -= 0.01;
            }
        } else {
            if (this.player.volume - 0.1 >= 0) {
                this.player.volume -= 0.1;
            } else if (this.player.volume > 0) {
                this.player.volume -= 0.01;
            }
        }

        this.player.volume = precisionRound(this.player.volume, 2);

        if (this.player.volume === 0) { // Muting player
            this.isMuted = true;
        }
    },


    volumeUp: function(ctrl, volumeBar) {
        if (this.player.volume === 0) { // Un-muting player
            this.isMuted = false;
        }

        if (!ctrl) {
            if (this.player.volume < 1) {
                this.player.volume += 0.01;
            }
        } else {
            if (this.player.volume + 0.1 <= 1) {
                this.player.volume += 0.1;
            } else if (this.player.volume < 1) {
                this.player.volume += 0.01;
            }
        }

        this.player.volume = precisionRound(this.player.volume, 2);
    },


    toggleRepeat: function() {
        if (this.isLooping) {
            this.isLooping = !this.isLooping;
            this.player.removeEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
        } else {
            this.isLooping = !this.isLooping;
            this.player.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
        }
    },


    // Class Getters and Setters
    getPlayer: function()                 { return this.player;             },
    getVolume: function()                 { return this.player.volume;      },
    getOldVolume: function()              { return this.oldVolume;          },
    getIsPlaying: function()              { return this.isPlaying;          },
    getIsMuted: function()                { return this.isMuted;            },

    setVolume: function(volume)           { this.player.volume = volume;    },
    setCurrentTime: function(currentTime) { this.currentTime = currentTime; },
    setIsLooping: function(looping)       { this.isLooping = looping;       }
};
