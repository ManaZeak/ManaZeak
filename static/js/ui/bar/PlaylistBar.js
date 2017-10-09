/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  PlaylistBar class - handle the playlist bar                                        *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var PlaylistBar = function(playlists) {
    this.playlistBar = null;
    this.playlists = playlists;

    this.entries = [];

    this.newPlaylistButton = null;

    this.init();
};


PlaylistBar.prototype = {

    init: function() {
        this.playlistBar = document.createElement("div");
        this.playlistBar.id = "playlistBar";

        this.addEntries();
        this.addNewPlaylistButton();

        this._eventListener();

        document.getElementById("mainContainer").appendChild(this.playlistBar);

    },


    addEntries: function() {
        for (var i = 0; i < this.playlists.length ;++i) {
            var entry = document.createElement("p");
            entry.innerHTML = this.playlists[i].getName();
            this.playlistBar.appendChild(entry);
        }
    },


    addNewPlaylistButton: function() {
        this.newPlaylistButton = document.createElement("p");
        this.newPlaylistButton.innerHTML = "+";
        this.playlistBar.appendChild(this.newPlaylistButton);
    },


    newPlaylist: function() {
        window.app.requestNewPlaylist();
    },


    _eventListener: function() {
        this.newPlaylistButton.addEventListener("click", this.newPlaylist);
    }
};
