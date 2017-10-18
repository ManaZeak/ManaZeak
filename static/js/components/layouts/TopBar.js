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

    this.userExpander = document.createElement("div");
    this.moodbar = document.createElement("div");
    this.playlistBar = document.createElement("div");


    this.topBar.id = "topBar";

    this.userExpander.id = "userExpander";
    this.moodbar.id = "moodbar";
    this.playlistBar.id = "playlistBar";

    this.topBar.appendChild(this.moodbar);
    this.topBar.appendChild(this.userExpander);
    this.topBar.appendChild(this.playlistBar);

    this.userMenu     = new UserMenu(this.userExpander);
    this.menu = new NewLibPlayMenu();


};


TopBar.prototype = {

    init: function(playlists, selectedPlaylist) {
        this.playlists = playlists;

        this.addEntries();
        this.addNewPlaylistButton();
        this.setSelected(selectedPlaylist);
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
	this.selectedPlaylist = id;
        this.entries[id].setIsSelected(true);
    },


    newLibPlay: function(e) {
        this.menu.toggleVisibilityLock(e);
//        window.app.requestNewPlaylist();
    },


    unSelectAll: function() {
        for (var i = 0; i < this.entries.length ;++i) {
		this.entries[i].setIsSelected(false);
        }
    },


    refreshPlaylistBar: function() {
        // TODO
    },


    viewClicked: function(event) {
        var target = event.target;
        // TODO : fix when target is null => when user click outside left or right of the listview
        while(target.parentNode && target.parentNode !== this.playlistBar) {
            target = target.parentNode;
        }
	if(target.parentNode === null)
		return true;
        var id = target.dataset.listViewID;

        if (id !== undefined) {
            this.unSelectAll();
            this.entries[id].setIsSelected(true);

            window.app.changePlaylist(this.entries[id].entry.id);
        }
    },


    changeMoodbar: function(id) {
        var that = this;

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                renderMoodFile(this.responseText.MOOD, that.moodbar);
            }
        };

        xhr.open("POST", "ajax/getMoodbarByID/", true);
        xhr.setRequestHeader('X-CSRFToken', this.cookies['csrftoken']);
        xhr.send(JSON.stringify({
            TRACK_ID: id
        }));
    },


    toggleUserMenu: function() {
        this.userMenu.toggleVisibilityLock();
    },


    _eventListener: function() {
        this.newPlaylistButton.addEventListener("click", this.newLibPlay.bind(this));
        this.userExpander.addEventListener("click", this.toggleUserMenu.bind(this));
        this.playlistBar.addEventListener("click", this.viewClicked.bind(this));
    },


    getTopBar: function() { return this.topBar; }
};
