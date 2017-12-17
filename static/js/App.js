/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  App class - ManaZeak main class, orchestrate all the front                         *
 *                                                                                     *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let App = function() {

    this.cookies = getCookies();
    // Objects
    this.topBar  = new TopBar();
    this.mainContainer = document.createElement("div");
    this.footBar = null;

    this.mainContainer.id = "mainContainer";

    this.player          = null;
    this.playlists       = [];
    this.activePlaylist  = null;
    this.queue           = new Queue();
    this.cssFiles        = {};

    this.appViews        = {};
    this.createDefaultViews();

    this.availableViews = {
        LIST: {
            index: 0,
            class: ListView
        },
        ALBUM: {
            index: 1,
            class: null
        }
    };

    this.listeners = {};
    for (let property in this) {
        if (typeof this[property] === "function") {
            this.listeners[property] = [];

            let oldFunc = this[property];

            this[property] = (function(pname, func) {
                return function() {
                    let r = func.apply(this, arguments);
                    for (let i = 0; i < this.listeners[pname].length; ++i)
                        this.listeners[pname][i].apply(null, arguments);
                    return r;
                }
            }(property, oldFunc));
        }
    }

    document.body.appendChild(this.topBar.getTopBar());
    document.body.appendChild(this.mainContainer);
};

App.prototype = {

    init: function() {
        this.player = new Player();
        this.footBar = new FootBar();
        document.body.appendChild(this.footBar.getFootBar());

        let that = this;
        // Loading playlists
        JSONParsedGetRequest(
            "ajax/getPlaylists/",
            function(response) {
                // TODO : ask ordered playlist : backend : libraries first then playlist
                /* response = {
                 *     DONE:           bool
                 *     PLAYLIST_IDS:   int[] / undefined
                 *     PLAYLIS-T_NAMES: string[] / undefined
                 *     ERROR_H1:       string
                 *     ERROR_MSG:      string
                 * } */
                that._appStart(response);
            }
        );
    },


    _appStart: function(playlists) {
        let that = this;
        if (playlists.DONE) { // User already have playlists
            let modal = new Modal("fetchPlaylists"); // TODO : gen unique ID from utils here
            modal.open();

            for (let i = 0; i < playlists.PLAYLIST_IDS.length; ++i) {
                that.playlists.push(new Playlist(playlists.PLAYLIST_IDS[i],
                    playlists.PLAYLIST_NAMES[i],
                    playlists.PLAYLIST_IS_LIBRARY[i],
                    true,
                    undefined,
                    undefined));
            }
            this.topBar.init(this.playlists, this.playlists[0]);
            this.playlists[0].getPlaylistsTracks(function() {
                modal.close();
                that.playlists[0].activate();
                that.changePlaylist();
                that.footBar.playlistPreview.setVisible(true);

                // TODO : replace begin arg to the active playlists, to avoid loading it
                that.getAllPlaylistsTracks(1); // 1 stand for the begining of the loop in playlists
            });
        }

        // User first connection
        else {
            this.playlists.push(new Playlist(0, null, true, false, undefined, function() {
                that.playlists[0].activate();
                that.topBar.init(that.playlists, that.playlists[0]);
                that.footBar.playlistPreview.setVisible(true);
                that.footBar.playlistPreview.changePlaylist(that.playlists[0]); // TODO : get Lib/Play image/icon
                // ? that.activePlaylist = that.playlists[0];
            }));
        }

        this._keyListener();
    },

    createDefaultViews: function() {
        this.createAppView('mzk_stats', new StatsView());
        this.createAppView('mzk_admin', new AdminView());
    },


    requestNewLibrary: function() {
        let that = this;

        this.playlists.push(new Playlist(0, null, true, false, undefined, function() {
            that.playlists[0].activate();
            that.topBar.refreshTopBar();
            that.footBar.playlistPreview.setVisible(true);
            that.footBar.playlistPreview.changePlaylist(that.playlists[0]); // TODO : get Lib/Play image/icon
            that.activePlaylist = that.playlists[0];
        }));
    },


    requestNewPlaylist: function() {
        let that = this;

        this.playlists.push(new Playlist(0, null, false, false, undefined, function() {
            that.playlists[0].activate();
            that.topBar.refreshTopBar();
            that.footBar.playlistPreview.setVisible(true);
            that.footBar.playlistPreview.changePlaylist(that.playlists[0]); // TODO : get Lib/Play image/icon
            that.activePlaylist = that.playlists[0];
        }));
    },


    addListener: function(event, callback) {
        if (Array.isArray(event)) {
            for (let i = 0; i < event.length; ++i)
                if (this.listeners[event[i]])
                    this.listeners[event[i]].push(callback);
        }

        else if (this.listeners[event]) {
            this.listeners[event].push(callback);
        }
    },

    getPlaylists: function() {
        return this.playlists.filter(function(element) {
            return element.isLibrary != true;
        });
    },


    // TODO : put this someday in a Shortcut class (in Utils maybe ?)
    _keyListener: function() {
        let that = this;

        // Key pressed event
        document.addEventListener("keydown", function(event) {
            switch (event.keyCode) {
                case 32: // Space player
                    that.togglePlay();
                    break;
                case 37: // Left arrow
                    if (event.ctrlKey)
                        that.rewind(30);
                    else
                        that.rewind(10);
                    break;
                case 38: // Up arrow
                    that.footBar.volumeUp(event);
                    break;
                case 39: // Right arrow
                    if (event.ctrlKey)
                        that.fastForward(30);
                    else
                        that.fastForward(10);
                    break;
                case 40: // Down arrow
                    that.footBar.volumeDown(event);
                    break;
                case 77: // m key (w/ ctrl)
                    if (event.ctrlKey)
                        that.toggleMute(event);
                    break;
                case 81:
                    if (event.ctrlKey)
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
                    that.footBar.delayHideVolume();
                    break;
                case 40: // Down arrow
                    that.footBar.delayHideVolume();
                    break;
                default:
                    break;
            }
        });
    },


    togglePlay: function() {
        if (this.player.isEmpty()) {
            this.changeTrack(this.activePlaylist.getFirstEntry(), false);
        }

        else {
            this.player.togglePlay();
        }
    },


    stopPlayback: function() {
        this.changePageTitle("ManaZeak");
        this.player.stopPlayback();
        this.topBar.resetMoodbar();
        this.footBar.resetUI();
    },


    toggleShuffle: function() {
        this.activePlaylist.toggleShuffle();
    },


    toggleRepeat: function() {
        this.activePlaylist.toggleRepeat();
    },


    next: function() {
        if (this.queue.isEmpty() == false) { this.popQueue();                     }
        else                               { this.activePlaylist.playNextTrack(); }
    },


    previous: function() {
        if (!this.player.isEmpty()) {
            this.activePlaylist.playPreviousTrack();
        }
    },


    repeatTrack: function() {
        this.player.repeatTrack();
    },


    fastForward: function(amount) {
        this.player.getPlayer().currentTime += amount;
    },


    rewind: function(amount) {
        this.player.getPlayer().currentTime -= amount;
    },


    setVolume: function(volume) {
        if (volume > 1)      { volume = 1; }
        else if (volume < 0) { volume = 0; }

        this.player.getPlayer().volume = precisionRound(volume, 2);
    },


    adjustVolume: function(amount) {
        this.setVolume(this.player.getPlayer().volume + amount);
    },


    mute: function() {
        this.player.mute();
    },


    unmute: function() {
        this.player.unmute();
    },


    toggleMute: function() {
        if(this.player.isMuted) {
            this.unmute();
            this.setVolume(this.player.oldVolume);
        }

        else {
            this.mute();
            this.setVolume(0);
        }
    },


    changeTrack: function(track, previous) {
        if(track == null)
            return false;

        let that = this;
        let lastTrackPath = this.player.player.attributes.getNamedItem("src"); // To update statistic on the previous track

        if (lastTrackPath !== null) {
            lastTrackPath = lastTrackPath.value;
        } else {
            lastTrackPath = "None";
        }

        this.footBar.progressBar.resetProgressBar();
        JSONParsedPostRequest(
            "ajax/getTrackPathByID/",
            JSON.stringify({
                TRACK_ID: track.id.track,
                LAST_TRACK_PATH: lastTrackPath,
                TRACK_PER: (this.player.getCurrentTime() * 100) / this.player.getDuration(),
                PREVIOUS: previous
            }),
            function(response) {
                if (response.RESULT === "FAIL") {
                    new Notification("ERROR", "Bad format.", response.ERROR);
                }

                else {
                    that.footBar.trackPreview.changeTrack(track);
                    that.topBar.changeMoodbar(track.id.track);
                    that.player.changeSource(".." + response.PATH);
                    that.changePageTitle(response.PATH);
                    that.activePlaylist.setCurrentTrack(track);
                    that.togglePlay();
                }
            }
        );
        return true;
    },


    changePlaylist: function() {
        this.footBar.playlistPreview.changePlaylist(this.activePlaylist); // TODO : get Lib/Play image/icon
    },


    changePageTitle: function(path) {
        // IDEA : Recontruct frrom Track attributes bc special char won't display as below ... (?/etc.)
        document.title = path.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, ''); // Automatically remove path to file and any extension
    },


    getAllPlaylistsTracks: function(begin) {
        for (let i = begin; i < this.playlists.length; ++i) {
            this.playlists[i].getPlaylistsTracks(undefined);
        }
    },


    refreshUI: function() {
        //this.playlists[this.activePlaylist - 1].refreshViews();
        this.topBar.refreshTopBar();
        this.footBar.playlistPreview.changePlaylist(this.activePlaylist); // TODO : get Lib/Play image/icon
        this.footBar.progressBar.refreshInterval(this.player.getPlayer());
    },


    pushQueue: function(track) {
        this.queue.enqueue(track);
    },


    popQueue: function () {
        this.changeTrack(this.queue.dequeue(), false);
    },


    reverseQueue: function(reverse) {
        this.queue.setReverse(reverse);
    },


    moveQueue: function(element, newPos) {
        this.queue.slide(element, newPos);
    },

    logOut: function() {
        getRequest(
            "logout",
            function() {
                location.reload();
            }
        );
    },


    changeView: function(view) {
        this.mainContainer.innerHTML = '';
        this.mainContainer.appendChild(view.getContainer());
    },

    showAppView: function(name) {
        if(this.appViews[name])
            this.changeView(this.appViews[name]);
    },

    createAppView: function(name, view) {
        if(this.appViews[name] == null)
        {
            this.appViews[name] = view;
            return true;
        }
        else
            return false;
    },

};

//TODO: Closure or something
let addonSrcs = document.querySelectorAll('script[data-script-type="appAddon"]');

for (let i = 0; i < addonSrcs.length; ++i) {
    addonSrcs[i].src = addonSrcs[i].dataset.src;
}
