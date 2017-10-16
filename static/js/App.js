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
    this.playlistBar  = new TopBar(this.cookies);
    this.listView     = null;
    this.playlists    = [];


    // UI
    this.ui = {
        mainContainer: document.getElementById("mainContainer")
    };
};

App.prototype = {

    init: function() {
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
                    that.playlists.push(new Playlist(playlists.PLAYLIST_IDS[0], playlists.PLAYLIST_NAMES[0], playlists.PLAYLIST_IS_LIBRARY[0], true, that.cookies, response, undefined));

                    // response = raw tracks JSON object
                    for (var i = 1; i < playlists.PLAYLIST_IDS.length; ++i) {
                        that.playlists.push(new Playlist(playlists.PLAYLIST_IDS[i], playlists.PLAYLIST_NAMES[i], playlists.PLAYLIST_IS_LIBRARY[i], true, that.cookies, undefined, undefined));
                    }

                    that.playlistBar.init(that.playlists, 0);
                    // TODO : change that.playlists[0] to last ID stored in cookies (0 by default)
                    console.log(that.playlists);
                    that.listView = new ListView(that.playlists[0].getId(), that.playlists[0].getTracks(), that.cookies);
                    that.listView.showListView();
                }
            );
        }

        // User first connection
        else {
            this.playlists.push(new Playlist(0, null, true, false, this.cookies, undefined, function() {
                that.playlistBar.init(that.playlists, 0);
                that.listView = new ListView(that.playlists[0].getId(), that.playlists[0].getTracks(), that.cookies);
                that.listView.showListView();
            }));
        }
    },


    changePlaylist: function(playlistId) {
        var that = this;

        for (var i = 0; i < this.playlists.length ;++i) {
            if (this.playlists[i].getId() == playlistId) {
                that.playlists[i].getPlaylistsTracks(playlistId, function() {
                that.playlistBar.setSelected(i);
                that.listView.hideListView();
                that.listView = null;
                that.listView = new ListView(playlistId, that.playlists[i].getTracks(), that.cookies);
                that.listView.showListView();
                });
                break;
            }
        }
    },


    requestNewPlaylist: function() {
        var that = this;

        while (this.ui.mainContainer.firstChild) {
           this.ui.mainContainer.removeChild(this.ui.mainContainer.firstChild);
        }

        this.playlists.push(new Playlist(0, null, true, false, this.cookies, undefined, function() {
            that.listView = null;
            that.listView = new ListView(that.playlists[0].getId(), that.playlists[that.playlists.length - 1].getTracks(), that.cookies);
            that.listView.showListView();
            that.playlistBar.init(that.playlists, that.playlistBar.entries.length);
        }));
    }
};
