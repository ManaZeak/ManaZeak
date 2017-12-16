/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  PlaylistBar class - handle the playlist bar                                        *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let TopBar = function() {
    this.moodbar           = null;
    this.playlistBar       = null;
    this.playlists         = null;
    this.selectedPlaylist  = null;
    this.entries           = [];

    this.topBar             = document.createElement("DIV");
    this.moodbar            = document.createElement("DIV");
    this.moodbarThumb       = document.createElement("DIV");
    this.playlistBar        = document.createElement("DIV");
    this.newPlaylistButton  = document.createElement("DIV");

    this.newPlaylistButton.innerText = '+';

    this.topBar.id       = "topBar";
    this.moodbar.id      = "moodbar";
    this.moodbarThumb.id = "moodbarThumb";
    this.playlistBar.id  = "playlistBar";


    this.topBar.appendChild(this.moodbar);
    this.moodbar.appendChild(this.moodbarThumb);
    this.topBar.appendChild(this.playlistBar);
    this.playlistBar.appendChild(this.newPlaylistButton);

    this.moodbarThumb.isVisible = false;

    this.userMenu = new UserMenu(this.topBar);
    this.wishList = new WishList(this.topBar);
    this.newLibMenu     = null;
};


TopBar.prototype = {

    init: function(playlists, selectedPlaylist) {
        this.removeEntries();
        this.playlists = playlists;

        this.addEntries();
        this.setSelected(selectedPlaylist.id);
        this._eventListener();
        this._contextMenuSetup();
    },


    addEntry: function(playlist) {
        this.entries.push(new PlaylistBarEntry(playlist, this.playlistBar, this.entries.length, playlist.getIsLibrary()));
    },


    addEntries: function() {
        this.playlistBar.removeChild(this.newPlaylistButton);
        for (let i = 0; i < this.playlists.length; ++i) {
            this.addEntry(this.playlists[i]);
        }
        this.playlistBar.appendChild(this.newPlaylistButton);
    },


    removeEntries: function() {
        for (let i = 0; i < this.entries.length; ++i) {
            this.playlistBar.removeChild(this.entries[i].entry)
        }

        // To the GC, and beyond
        this.entries = [];
    },


    setSelected: function(id) {
	    for (let i = 0; i < this.entries.length; ++i) {
	        if (i == id || this.entries[i].getId() == id) {
                this.selectedPlaylist = i;
                this.entries[i].setIsSelected(true);
            }
        }

    },


    unSelectAll: function() {
        for (let i = 0; i < this.entries.length; ++i) {
		    this.entries[i].setIsSelected(false);
        }
    },


    refreshTopBar: function() {
        this.removeEntries();
        this.addEntries();
        // TODO : set selected to new one
        this.setSelected(this.selectedPlaylist);
    },


    viewClicked: function(event) {
        let target = event.target;

        while(target.parentNode && target.parentNode !== this.playlistBar) {
            target = target.parentNode;
        }

	    if(target.parentNode === null) {
		    return true;
        }

        let id = target.dataset.childID;

        if (id !== undefined) {
            this.unSelectAll();
            this.setSelected(id);
            this.entries[id].playlist.activate();
            window.app.refreshUI();
        }
    },


    changeMoodbar: function(id) {
        if (!this.moodbarThumb.isVisible) {
            this.moodbarThumb.isVisible = true;
            addVisibilityLock(this.moodbarThumb);
        }

        let that = this;
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var tmp = JSON.parse(this.responseText);
                renderMoodFile(tmp.MOOD, that.moodbar);
            }
        };

        xhr.open("POST", "ajax/getMoodbarByID/", true);
        xhr.setRequestHeader('X-CSRFToken', window.app.cookies['csrftoken']);
        xhr.send(JSON.stringify({
            TRACK_ID: id
        }));
    },


    resetMoodbar: function() {
        d3.selectAll('#moodbar svg').remove();
        this.moodbarThumb.isVisible = false;
        removeVisibilityLock(this.moodbarThumb);
    },


    _eventListener: function() {
        this.playlistBar.addEventListener("click", this.viewClicked.bind(this));
    },

    _contextMenuSetup: function() {
        this.newLibMenu = new ContextMenu(this.newPlaylistButton, null, 'click');
        this.newLibMenu.addEntry(null, 'New Library', function() {
            window.app.requestNewLibrary();
        });
        this.newLibMenu.addEntry(null, 'New Playlist', function() {
            window.app.requestNewPlaylist();
        });
    },


    getTopBar: function() { return this.topBar; }
};
