/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  App class - ManaZeak main class, orchestrate all the front                         *
 *                                                                                     *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var App = function() {

    this.cookies = getCookies();

    // Objects
    this.topBar  = new TopBar(this.cookies);
    this.mainContainer = document.createElement("div");
    this.footBar = null;

    this.mainContainer.id = "mainContainer";

    this.player          = null;
    this.playlists       = [];
    this.activePlaylist = null;
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
                    for(var i = 0; i < this.listeners[pname].length;++i)
                        this.listeners[pname][i]();
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
                this.cookies,
                JSON.stringify({
                    PLAYLIST_ID: playlists.PLAYLIST_IDS[0]
                }),
                function(response) {
                    //TODO: init others in callback
                    that.playlists.push(new Playlist(playlists.PLAYLIST_IDS[0],
                                                     playlists.PLAYLIST_NAMES[0],
                                                     playlists.PLAYLIST_IS_LIBRARY[0],
                                                     true,
                                                     response,
                                                     undefined));
                    // response = raw tracks JSON object
                    for (var i = 1; i < playlists.PLAYLIST_IDS.length; ++i) {
                        that.playlists.push(new Playlist(playlists.PLAYLIST_IDS[i],
                                                         playlists.PLAYLIST_NAMES[i],
                                                         playlists.PLAYLIST_IS_LIBRARY[i],
                                                         true,
                                                         undefined,
                                                         undefined));
                    }

                    that.topBar.init(that.playlists, 0);
                    // TODO : change that.playlists[0] to last ID stored in cookies (0 by default)
                    that.playlists[0].activate();
                    //that.playlistPreview.changePlaylist(that.playlists[0]); // TODO : get Lib/Play image/icon
                }
            );
        }

        // User first connection
        else {
            this.playlists.push(new Playlist(0, null, true, false, this.cookies, undefined, function() {
                that.topBar.init(that.playlists, 0);
            }));
        }
    },


    changePlaylist: function(playlistId) {
        var that = this;

        for (var i = 0; i < this.playlists.length ;++i) {
            if (this.playlists[i].getId() === playlistId) {
                that.playlists[i].getPlaylistsTracks(playlistId, function() {
                    that.topBar.setSelected(i);
                    that.listView.hideListView();
                    that.listView = null;
                    that.listView = new ListView(playlistId,
                                                 that.playlists[i].getTracks(),
                                                 that.cookies);
                    that.listView.showListView();
                });
                break;
            }
        }
    },


    requestNewLibrary: function() {
        var that = this;

        while (this.mainContainer.firstChild) {
           this.mainContainer.removeChild(this.mainContainer.firstChild);
        }

        this.playlists.push(new Playlist(0, null, true, false, this.cookies, undefined, function() {
            that.listView = null;
            that.listView = new ListView(that.playlists[0].getId(),
                                         that.playlists[that.playlists.length - 1].getTracks(),
                                         that.cookies);
            that.listView.showListView();
            that.topBar.init(that.playlists, that.topBar.entries.length);
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