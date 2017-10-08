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
                }),
                function(response) {
                    // TODO : store playlist and list view in App object
                    // TODO : change that.playlists[0] to last ID stored in cookies (0 by default)
                    that.playlists.push(new Playlist(playlists.ID, playlists.NAMES, false, that.cookies, response, undefined));
                    that.listsView.push(new ListView(that.playlists[0].getTracks(), that.cookies));
                    new PlaylistBar(that.playlists);
                    //console.log(that.playlists[0].getTracks());
                }
            );
        } else { // User first connection to the app
            this.playlists.push(new Playlist(0, null, true, this.cookies, undefined, function() {
                that.listsView.push(new ListView(that.playlists[0].getTracks(), that.cookies));
                new PlaylistBar(that.playlists);
            }));
        }
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
