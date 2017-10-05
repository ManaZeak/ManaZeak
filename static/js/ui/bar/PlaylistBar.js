/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  PlaylistBar class - handle the playlist bar                                        *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var PlaylistBar = function(playlists) {
    this.playlistBar = null;
    this.playlists = playlists;

    this.entries = [];

    this.init();
};


PlaylistBar.prototype = {

    init: function() {
        this.playlistBar = document.createElement("div");
        this.playlistBar.id = "playlistBar";

        this.addEntries();

        document.getElementById("mainContainer").appendChild(this.playlistBar);

    },


    addEntries: function() {
        for (var i = 0; i < this.playlists.length ;++i) {
            var entry = document.createElement("p");
            entry.innerHTML = this.playlists[i].getName();
            this.playlistBar.appendChild(entry);
        }
    }
};
