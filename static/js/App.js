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
        JSONParsedGetRequest( // Loading playlists
            "ajax/getPlaylists/",
            false,
            function(response) {
                that._appStart(response);
            }
        );
    },


    _appStart: function(playlists) {
        var that = this;

        if (playlists.RESULT !== 0) { // If user already have playlist(s)
            JSONParsedPostRequest(
                "ajax/getPlaylistTracks/",
                this.cookies,
                JSON.stringify({ // TODO : replace stringify w/ vanilla json requeest
                    ID: playlists.ID[0],
                    SAVE: false
                }), // TODO : set selected PlaylistBar item with solid border
                function(response) {
                    // TODO : change that.playlists[0] to last ID stored in cookies (0 by default)
                    for (var i = 0; i < playlists.RESULT; ++i) {
                        that.playlists.push(new Playlist(playlists.ID[i], playlists.NAMES[i], false, true, that.cookies, response, undefined));
                    }

                    that.listsView.push(new ListView(that.playlists[0].getTracks(), that.cookies));
                    new PlaylistBar(that.playlists);
                }
            );
        } else { // User first connection to the app
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
