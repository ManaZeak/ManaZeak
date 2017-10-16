/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  PlaylistBar class - handle the playlist bar                                        *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var TopBar = function(cookies) {
    this.cookies = cookies;

    this.moodbar = null;
    this.playlistBar = null;
    this.playlists = null;
    this.selectedPlaylist = null;
    this.entries = [];
    this.newPlaylistButton = null;

    this.topBar = document.createElement("div");
    this.topBar.id = "topBar";

    this.userExpander = document.createElement("div");
    this.userExpander.id = "userExpander";
    this.moodbar = document.createElement("div");
    this.moodbar.id = "moodbar";
    this.playlistBar = document.createElement("div");
    this.playlistBar.id = "playlistBar";

    this.topBar.appendChild(this.moodbar);
    this.topBar.appendChild(this.userExpander);
    this.topBar.appendChild(this.playlistBar);
    document.body.appendChild(this.topBar);

    this.userMenu     = new UserMenu();
    this.menu = new NewLibPlayMenu();


};
// TODO : fuse topbar and playlist bar together

TopBar.prototype = {

    init: function(playlists, selectedPlaylist) {
        this.playlists = playlists;
        this.selectedPlaylist = selectedPlaylist;

        this.addEntries();
        this.addNewPlaylistButton();
        this.setSelected(this.selectedPlaylist);
        this._eventListener();
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
        this.newPlaylistButton = document.createElement("div");
        this.newPlaylistButton.innerHTML = "+";
        this.playlistBar.appendChild(this.newPlaylistButton);
    },


    setSelected: function(id) {
        this.entries[id].setIsSelected(true);
    },


    newLibPlay: function(e) {
        this.menu.toggleVisibilityLock(e);
//        window.app.requestNewPlaylist();
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

        if (id !== undefined) {
            this.unSelectAll();
            this.entries[id].setIsSelected(true);

            window.app.changePlaylist(this.entries[id].entry.id);
        }
    },


    changeMoodbar: function(id) {
        var that = this;

        renderMoodFile("../../mood/test.mood", that.moodbar);
/*
        JSONParsedPostRequest( // Loading playlists
            "ajax/getMoodbarFromID/",
            this.cookies,
            JSON.stringify({
                TRACK_ID: id
            }),
            function(response) {
                renderMoodFile(response.FILE, that.moodbar);
            }
        );
*/
    },


    toggleUserMenu: function() {
        this.userMenu.toggleVisibilityLock();
    },


    _eventListener: function() {
        this.newPlaylistButton.addEventListener("click", this.newLibPlay.bind(this));
        this.userExpander.addEventListener("click", this.toggleUserMenu.bind(this));
        this.playlistBar.addEventListener("click", this.viewClicked.bind(this));
    }
};
