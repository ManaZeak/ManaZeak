/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  PlaylistBar class - handle the playlist bar                                        *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var PlaylistBar = function(playlists, selectedPlaylist) {
    this.playlistBar = null;
    this.playlists = playlists;
    this.selectedPlaylist = selectedPlaylist;

    this.entries = [];

    this.newPlaylistButton = null;

    this.init();
};
// TODO : fuse topbar and playlist bar together

PlaylistBar.prototype = {

    init: function() {
        this.playlistBar = document.createElement("div");
        this.playlistBar.id = "playlistBar";

        this.addEntries();
        this.addNewPlaylistButton();
        this.setSelected(this.selectedPlaylist);
        this._eventListener();

        document.getElementById("mainContainer").appendChild(this.playlistBar);
    },


    addEntry: function(playlist) {
        this.entries.push(new PlaylistBarEntry(playlist, this.playlistBar, this.entries.length, playlist.getIsLibrary()));
    },


    addEntries: function() {
        for (var i = 0; i < this.playlists.length ;++i) {
            this.addEntry(this.playlists[i]);
        }
    },


    addNewPlaylistButton: function() {
        this.newPlaylistButton = document.createElement("p");
        this.newPlaylistButton.innerHTML = "+";
        this.playlistBar.appendChild(this.newPlaylistButton);
    },


    setSelected: function(id) {
        this.entries[id].setIsSelected(true);
    },


    newPlaylist: function() {
        window.app.requestNewPlaylist();
    },


    unSelectAll: function() {
        for (var i = 0; i < this.entries.length ;++i) {
            if (this.entries[i].getIsSelected()) {
                this.entries[i].setIsSelected(false);
            }
        }
    },


    viewClicked: function(event) {
        var target = event.target;
        // TODO : fix when target is null => when user click outside left or right of the listview
        while(target.parentNode !== this.playlistBar) {
            target = target.parentNode;
        }

        var id = target.dataset.listViewID;

        console.log(id);

        this.unSelectAll();
        this.entries[id].setIsSelected(true);

        window.app.changePlaylist(this.entries[id].entry.id);
    },


    _eventListener: function() {
        this.newPlaylistButton.addEventListener("click", this.newPlaylist);
        this.playlistBar.addEventListener("click", this.viewClicked.bind(this));
    }
};
