/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  App class - ManaZeak main class, orchestrate all the front                         *
 *                                                                                     *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var App = function() {

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
    for(var property in this) {
        if(typeof this[property] === "function") {
            this.listeners[property] = [];
            var oldFunc = this[property];
            this[property] = (function(pname, func) {
                return function() {
                    func.apply(this, arguments);
                    for(var i = 0; i < this.listeners[pname].length;++i) {
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

        var that = this;
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
        var that = this;
        // User already have playlists
        if (playlists.DONE) {
            JSONParsedPostRequest(
                "ajax/getSimplifiedTracks/",
                JSON.stringify({
                    PLAYLIST_ID: playlists.PLAYLIST_IDS[0]
                }),
                function(response) {
                    // response = raw tracks JSON object
                    that.playlists.push(new Playlist(playlists.PLAYLIST_IDS[0],
                        playlists.PLAYLIST_NAMES[0],
                        playlists.PLAYLIST_IS_LIBRARY[0],
                        true,
                        response,
                        undefined));
                    for (var i = 1; i < playlists.PLAYLIST_IDS.length; ++i) {
                        that.playlists.push(new Playlist(playlists.PLAYLIST_IDS[i],
                            playlists.PLAYLIST_NAMES[i],
                            playlists.PLAYLIST_IS_LIBRARY[i],
                            true,
                            undefined, // TODO : load tracks from other playlists.
                            undefined));
                    }

                    that.getAllPlaylistsTracks();
                    that.topBar.init(that.playlists, that.playlists[0]);
                    // TODO : change that.playlists[0] to last ID stored in cookies (0 by default)
                    that.playlists[0].activate();
                    that.changePlaylist();
                    that.footBar.playlistPreview.setVisible(true);
                }
            );
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
    },


    requestNewLibrary: function() {
        var that = this;

        while (this.mainContainer.firstChild) {
            this.mainContainer.removeChild(this.mainContainer.firstChild);
        }

        this.playlists.push(new Playlist(0, null, true, false, undefined, function() {
            that.playlists[0].activate();
            that.topBar.refreshTopBar();
            that.footBar.playlistPreview.setVisible(true);
            that.footBar.playlistPreview.changePlaylist(that.playlists[0]); // TODO : get Lib/Play image/icon
            that.activePlaylist = that.playlists[0];
        }));
    },

    addListener: function(event, callback) {
        if (Array.isArray(event)) {
            for (var i = 0; i < event.length; ++i)
                if (this.listeners[event[i]])
                    this.listeners[event[i]].push(callback);
        }
        else if(this.listeners[event])
            this.listeners[event].push(callback);
    }
};

//TODO: Closure or something
var addonSrcs = document.querySelectorAll('script[data-script-type="appAddon"]');
for(var i = 0; i < addonSrcs.length; ++i)
    addonSrcs[i].src = addonSrcs[i].dataset.src;