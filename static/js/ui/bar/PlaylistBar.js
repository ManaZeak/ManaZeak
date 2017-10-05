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
        this.playlistBar = mkElem("div");
        this.playlistBar.id = "playlistBar";

        this.addEntries();

        getById("mainContainer").appendChild(this.playlistBar);

    },


    addEntries: function() {
        for (var i = 0; i < this.playlists.length ;++i) {
            var entry = mkElem("p");
            entry.innerHTML = this.playlists[i].getName();
            this.playlistBar.appendChild(entry);
        }
    }
};
