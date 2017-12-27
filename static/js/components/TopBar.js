/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                           *
 *  PlaylistBarEntry sub class                               *
 *                                                           *
 *                                                           *
 *  playlist    : {int} Playlist ID in db                    *
 *  playlistBar : {bool} true => new library, false => load  *
 *  id          : {int} Playlist tracks                      *
 *  isLibrary   : {bool} Not mandatory                       *
 *                                                           *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
class PlaylistBarEntry {
    constructor(playlist, playlistBar, id, isLibrary) {

        this.entry                 = document.createElement("DIV");
        this.entry.dataset.childID = id;
        this.entry.id              = playlist.id;
        this.playlist              = playlist;
        this.isLibrary             = isLibrary;
        this.entry.innerHTML       = playlist.getName();
        if (this.isLibrary) { this.entry.className = "library";  }
        else                { this.entry.className = "playlist"; }
        this.isSelected            = false;

        if (this.isLibrary) {
            if (window.app.user.getIsAdmin()) {
                this._createOptionButton();
            }
        }

        else {
            this._createOptionButton();
        }

        playlistBar.appendChild(this.entry);
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : setIsSelected (public)
     * class  : PlaylistBarEntry
     * desc   : Set entry as selected/!selected
     * arg    : {bool} isSelected
     **/
    setIsSelected(isSelected) {
        this.isSelected = isSelected;

        if (this.isLibrary) {
            if (this.isSelected) { this.entry.classList.add("librarySelected");    }
            else                 { this.entry.classList.remove("librarySelected"); }
        }

        else {
            if (this.isSelected) { this.entry.classList.add("playlistSelected");    }
            else                 { this.entry.classList.remove("playlistSelected"); }
        }
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _contextMenuSetup (private)
     * class  : ListView
     * desc   : TODO
     **/
    _contextMenuSetup() {
        let that             = this;
        this.contextMenu     = null;
        this.contextMenu     = new ContextMenu(this.options, null, 'click');
        this.contextMenu.addEntry(null, "Rename", function() {
            that.modal = new Modal("renamePlaylist", {
                name: that.playlist.name,
                id:   that.playlist.id
            });
            that.modal.open();
        });
        this.contextMenu.addEntry(null, "Delete", function() {
            that.modal = new Modal("deletePlaylist", {
                name: that.playlist.name,
                id:   that.playlist.id
            });
            that.modal.open();
        });
    }


    _createOptionButton() {
        let that = this;
        // TODO : add admin options, or library options
        this.options       = document.createElement("A");
        this.options.id    = "gear";
        this.options.addEventListener("mouseleave", function() {
            if (that.contextMenu) {
                that.contextMenu.setInvisible();
            }
        });
        this.entry.appendChild(this.options);
        this._contextMenuSetup();
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getId()         { return this.entry.id;   }
    getIsSelected() { return this.isSelected; }

}



/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  TopBar class                                   *
 *                                                 *
 *  Handle the whole topBar and its components     *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class TopBar {
    constructor() {

        this._createUI();
        this.partyMode  = new PartyMode(this.topBar);
        this.wishList   = new WishList(this.topBar);
        this.userMenu   = new UserMenu(this.topBar);
        this.newLibMenu = null;
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : changeMoodbar (public)
     * class  : TopBar
     * desc   : Request the moodbar from a track ID and set it
     * arg    : {int} id - The Track ID
     **/
    changeMoodbar(id) {
        let that = this;
        JSONParsedPostRequest(
            "ajax/getMoodbarByID/",
            JSON.stringify({
                TRACK_ID: id
            }),
            function(response) {
                if (!that.moodbarThumb.isVisible) {
                    that.moodbarThumb.isVisible = true;
                    addVisibilityLock(that.moodbarThumb);
                }
                renderMoodFile(response.MOOD, that.moodbar);
            }

        );
    }


    /**
     * method : init (public)
     * class  : TopBar
     * desc   : Init the Playlist Bar and the context menu
     * arg    : {[objects]} playlists - User playlists
     *        : {object} selectedPlaylist - The playlist to put focus on
     **/
    init(playlists, selectedPlaylist) {
        this.playlists = playlists;
        this._removeEntries();
        this._addEntries();
        this._setSelected(selectedPlaylist.id, true);
        this._eventListener();
        this._contextMenuSetup();

        window.app.footBar.setMoodbarProgress();
    }


    /**
     * method : refreshTopBar (public)
     * class  : TopBar
     * desc   : Refresh the TopBar components
     **/
    refreshTopBar() {
        this._removeEntries();
        this._addEntries();
        this._unSelectAll();
        this._setSelected(this.selectedPlaylist);
    }


    /**
     * method : resetMoodbar (public)
     * class  : TopBar
     * desc   : Erase moodbar content and hide moodbar thumb
     **/
    resetMoodbar() {
        d3.selectAll('#moodbar svg').remove();
        this.moodbarThumb.isVisible = false;
        removeVisibilityLock(this.moodbarThumb);
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _addEntries (private)
     * class  : TopBar
     * desc   : Add all playlists as entries in playlist bar
     **/
    _addEntries() {
        this.playlistBar.removeChild(this.newPlaylistButton);

        for (let i = 0; i < this.playlists.length; ++i) {
            this.entries.push(new PlaylistBarEntry(this.playlists[i], this.playlistBar, this.entries.length, this.playlists[i].getIsLibrary()));
        }

        this.playlistBar.appendChild(this.newPlaylistButton);
    }


    /**
     * method : _contextMenuSetup (private)
     * class  : TopBar
     * desc   : Setup a context menu for Add library button and listen
     **/
    _contextMenuSetup() {
        this.newLibMenu = new ContextMenu(this.newPlaylistButton, null, 'click');
        this.newLibMenu.addEntry(null, 'New Library', function() {
            window.app.requestNewLibrary();
        });
        this.newLibMenu.addEntry(null, 'New Playlist', function() {
            window.app.requestNewPlaylist();
        });
    }


    /**
     * method : _createUI (private)
     * class  : TopBar
     * desc   : Build UI elements
     **/
    _createUI() {
        this.moodbar                     = null;
        this.playlistBar                 = null;
        this.playlists                   = null;
        this.selectedPlaylist            = null;
        this.entries                     = [];

        this.topBar                      = document.createElement("DIV");
        this.moodbar                     = document.createElement("DIV");
        this.moodbarThumb                = document.createElement("DIV");
        this.playlistBar                 = document.createElement("DIV");
        this.newPlaylistButton           = document.createElement("DIV");

        this.topBar.id                   = "topBar";
        this.moodbar.id                  = "moodbar";
        this.moodbarThumb.id             = "moodbarThumb";
        this.playlistBar.id              = "playlistBar";
        this.newPlaylistButton.innerText = '+';

        this.topBar.appendChild(this.moodbar);
        this.moodbar.appendChild(this.moodbarThumb);
        this.topBar.appendChild(this.playlistBar);
        this.playlistBar.appendChild(this.newPlaylistButton);

        this.moodbarThumb.isVisible      = false;
    }


    /**
     * method : _eventListener (private)
     * class  : TopBar
     * desc   : TopBar event listeners
     **/
    _eventListener() {
        this.playlistBar.addEventListener("click", this._viewClicked.bind(this));
    }


    /**
     * method : _removeEntries (private)
     * class  : TopBar
     * desc   : Remove all entries in playlist bar
     **/
    _removeEntries() {
        for (let i = 0; i < this.entries.length; ++i) {
            this.playlistBar.removeChild(this.entries[i].entry)
        }

        this.entries = []; // To the GC, and beyond
    }


    /**
     * method : _setSelected (private)
     * class  : TopBar
     * desc   : Set a playlist bar entry as selected
     * arg    : {int} id - the id of the playlist to select
     *        : {bool} useID - a boolean indicating whether to use the real ID of the track (true) or the index in the array (false)
     **/
    _setSelected(id, useID) {
        for (let i = 0; i < this.entries.length; ++i) {
            if ((useID != true && i == id) || (useID == true && this.entries[i].getId() == id)) {
                this.selectedPlaylist = i;
                this.entries[i].setIsSelected(true);
                return;
            }
        }
    }


    /**
     * method : _unSelectAll (private)
     * class  : TopBar
     * desc   : Unselect every entry in playlist bar
     **/
    _unSelectAll() {
        for (let i = 0; i < this.entries.length; ++i) {
            this.entries[i].setIsSelected(false);
        }
    }


    /**
     * method : _viewClicked (private)
     * class  : TopBar
     * desc   : Handle clicks in TopBar
     * arg    : {object} event - the click event
     **/
    _viewClicked(event) {
        let target = event.target;

        while (target.parentNode && target.parentNode !== this.playlistBar) {
            target = target.parentNode;
        }

        if (target.parentNode === null) {
            return true;
        }

        let id = target.dataset.childID;

        if (id !== undefined && id !== "gear") {
            this._unSelectAll();
            this._setSelected(id);
            this.entries[id].playlist.activate();
        }
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getTopBar() { return this.topBar; }

}
