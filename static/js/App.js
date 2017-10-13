/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  App class - ManaZeak main class, orchestrate all the front                         *
 *                                                                                     *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var App = function() {

    // App internal attributes
    this.cookies = getCookies();
    // Objects
    this.player       = new Player();
    this.trackPreview = new TrackPreview();
    this.userMenu     = new UserMenu();
    this.topbar       = new TopBar();
    this.playlists    = [];
    this.listsView    = [];


    // UI
    this.ui = {
        mainContainer: document.getElementById("mainContainer"),
        userExpander: {
            button:    document.getElementById("userExpander")
        }
    };
};

App.prototype = {

    init: function() {
        var that = this;

        //this._keyListener();   // Loading shortcuts
        this._eventListener(); // Loading events

        // Loading playlists
        JSONParsedGetRequest(
            "ajax/getPlaylists/",
            false,
            function(response) {
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

        // TODO : set selected PlaylistBar item with solid border

        // User already have playlists
        if (playlists.DONE) {
            JSONParsedPostRequest(
                "ajax/getSimplifiedTracks/",
                this.cookies,
                JSON.stringify({
                    PLAYLIST_ID: playlists.PLAYLIST_IDS[0]
                }),
                function(response) {
                    // response = raw tracks JSON object
                    for (var i = 0; i < playlists.PLAYLIST_IDS.length; ++i) {
                        that.playlists.push(new Playlist(playlists.PLAYLIST_IDS[i], playlists.PLAYLIST_NAMES[i], playlists.PLAYLIST_IS_LIBRARY[i], true, that.cookies, response, undefined));
                    }

                    // TODO : change that.playlists[0] to last ID stored in cookies (0 by default)
                    that.listsView.push(new ListView(that.playlists[0].getTracks(), that.cookies));
                    new PlaylistBar(that.playlists);
                }
            );
        }

        // User first connection
        else {
            this.playlists.push(new Playlist(0, null, true, false, this.cookies, undefined, function() {
                that.listsView.push(new ListView(that.playlists[0].getTracks(), that.cookies));
                console.log(that.playlists);
                new PlaylistBar(that.playlists);
            }));
        }
    },


    requestNewPlaylist: function() {
        var that = this;

        while (this.ui.mainContainer.firstChild) {
           this.ui.mainContainer.removeChild(this.ui.mainContainer.firstChild);
        }

        this.playlists.push(new Playlist(0, null, true, false, this.cookies, undefined, function() {
                that.listsView.push(new ListView(that.playlists[that.playlists.length - 1].getTracks(), that.cookies));
                new PlaylistBar(that.playlists);
        }));
    },


    toggleUserMenu: function() {
        this.userMenu.toggleVisibilityLock();
    },

    _eventListener: function() {
        var that = this;
        // Button event listeners
        this.ui.userExpander.button.addEventListener("click", this.toggleUserMenu.bind(this));
    }
};
