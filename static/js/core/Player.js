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
    this.isLooping = false;

    this.oldVolume = 0;

    this.queue       = new Queue();

    this.init();
};


Player.prototype = {

    init: function() {
        this._eventListener();
        this._keyListener();
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


    toggleQueue: function(event) {
        if (event.ctrlKey || event.type === "click") {
            this.queue.toggleVisibilityLock();
        }
    },


    _eventListener: function() {
        var that = this;
        this.player.addEventListener("ended", window.app.next.bind(window.app));
        //this.player.addEventListener("loadedmetadata", window.app.updateMetadata.bind(window.app));
    },



    _keyListener: function() {
        var that = this;

        // Key pressed event
        document.addEventListener("keydown", function(event) {
            switch (event.keyCode) {
                case 32: // Space player
                    window.app.togglePlay();
                    break;
                case 37: // Left arrow
                    that.rewind(event);
                    break;
                case 38: // Up arrow
                    that.volumeUp(event);
                    break;
                case 39: // Right arrow
                    that.fastForward(event);
                    break;
                case 40: // Down arrow
                    that.volumeDown(event);
                    break;
                case 77: // m key (w/ ctrl)
                    that.toggleMute(event);
                    break;
                case 81:
                    that.toggleQueue(event);
                    break;
                default:
                    break;
            }
        });

        // Key released event
        document.addEventListener("keyup", function(event) {
            switch (event.keyCode) {
                case 38: // Up arrow
                    that.delayHideVolume();
                    break;
                case 40: // Down arrow
                    that.delayHideVolume();
                    break;
                default:
                    break;
            }
        });
    },

    // Class Getters and Setters
    getPlayer: function()                 { return this.player;             },
    getVolume: function()                 { return this.player.volume;      },
    getOldVolume: function()              { return this.oldVolume;          },
    getIsPlaying: function()              { return this.isPlaying;          },
    getIsLooping: function()              { return this.isLooping;          },
    getIsMuted: function()                { return this.isMuted;            },

    setIsMuted: function(muted)           { this.isMuted = muted;           },
    setVolume: function(volume)           { this.player.volume = volume;    },
    setCurrentTime: function(currentTime) { this.currentTime = currentTime; },
    setIsLooping: function(looping)       { this.isLooping = looping;       }
};
