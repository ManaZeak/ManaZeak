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
                    func.apply(this, arguments);
                    for (let i = 0; i < this.listeners[pname].length; ++i) {
                        this.listeners[pname][i].apply(null, arguments);
                    }
                }
            }(property, oldFunc));
        }
    }

    document.body.appendChild(this.topBar.getTopBar());
    document.body.appendChild(this.mainContainer);
};

App.prototype = {

    init: function() {
        this.player = new Player(this.cookies);
        this.footBar = new FootBar();
        document.body.appendChild(this.footBar.getFootBar());

        let that = this;
        // Loading playlists
        JSONParsedGetRequest(
            "ajax/getPlaylists/",
            false,
            function(response) {
                // TODO : ask ordered playlist : backend : libraries first then playlist
                /* response = {
                 *     DONE:           bool
                 *     PLAYLIST_IDS:   int[] / undefined
                 *     PLAYLIST_NAMES: string[] / undefined
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


    requestNewLibrary: function() {
        let that = this;

        this.playlists.push(new Playlist(0, null, true, false, undefined, function() {
            while (this.mainContainer.firstChild) {
                this.mainContainer.removeChild(this.mainContainer.firstChild);
            }
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
    }
};

//TODO: Closure or something
let addonSrcs = document.querySelectorAll('script[data-script-type="appAddon"]');

for (let i = 0; i < addonSrcs.length; ++i) {
    addonSrcs[i].src = addonSrcs[i].dataset.src;
}
