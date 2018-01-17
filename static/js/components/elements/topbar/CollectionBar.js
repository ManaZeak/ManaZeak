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
class PlaylistCollectionEntry {
    //TODO: free the listeners
    constructor(playlist, container) {

        this.isLibrary             = playlist.getIsLibrary();
        this.playlist              = playlist;

        this.entry                 = document.createElement("DIV");
        this.entry.dataset.childID = playlist.id;

        this.label                 = document.createElement('SPAN');
        this.label.innerHTML       = playlist.getName();
        this.entry.appendChild(this.label);

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

        container.appendChild(this.entry);
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

    /**
     * method : rename
     * class  : CollectionBarEntry
     * desc   : Rename an entry
     * arg    : {string} name
     **/
    rename(name) {
        this.label.innerHTML = name;
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

    getEntry()      { return this.entry; }
    getID()         { return this.entry.dataset.childID;   }
    getIsSelected() { return this.isSelected; }

}


/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  CollectionBar class                            *
 *                                                 *
 *  PlaylistCollection display                     *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class CollectionBar extends MzkObject {
    constructor(collection, container) {

        super();
        this.collection     = collection;
        this.entries        = [];
        this.newLibMenu = null;

        this.element        = document.createElement('DIV');
        this.libsContainer  = document.createElement('DIV');
        this.playContainer  = document.createElement('DIV');
        this.newButton      = document.createElement("DIV");
        this.newButton.innerText = '+';

        this.element.appendChild(this.libsContainer);
        this.element.appendChild(this.playContainer);
        this.element.appendChild(this.newButton);

        this._eventListener();
        this._contextMenuSetup();
        this.refresh();
        container.appendChild(this.element);
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //


    /**
     * method : refresh (private)
     * class  : PlaylistCollection
     * desc   : Refresh the display from the collection
     **/
    refresh() {
        this.libsContainer.innerHTML = '';
        this.playContainer.innerHTML = '';
        this.entries = [];

        var self = this;
        this.collection.forEach(function() {
            if(this.getIsLibrary() == true)
                self.entries.push(new PlaylistCollectionEntry(this, self.libsContainer));
            else
                self.entries.push(new PlaylistCollectionEntry(this, self.playContainer));
        });
        self.setSelected(window.app.getActivePlaylistID());
    }


    /**
     * method : unSelectAll (private)
     * class  : CollectionBar
     * desc   : Unselect every entry in playlist bar
     **/
    unSelectAll() {
        for (let i = 0; i < this.entries.length; ++i) {
            this.entries[i].setIsSelected(false);
        }
    }


    /**
     * method : setSelected (public)
     * class  : CollectionBar
     * desc   : Set a playlist bar entry as selected
     * arg    : {int} id - the id of the playlist to select
     **/
    setSelected(id) {
        for (let i = 0; i < this.entries.length; ++i) {
            if (this.entries[i].getID() == id) {
                this.entries[i].setIsSelected(true);
                return;
            }
        }
    }

//  --------------------------------  PRIVATE METHODS  ---------------------------------  //

    /**
     * method : _eventListener (private)
     * class  : PlaylistCollection
     * desc   : PlaylistCollection event listeners
     **/
    _eventListener() {

        var self = this;
        this.collection.listen(['add', 'remove', 'clear'], function() {
            self.refresh();
        });
        this.collection.listen('rename', function(id, name) {
            for(let i = 0; i < self.entries.length; ++i)
                if(self.entries[i].getID() == id) {
                    self.entries[i].rename(name);
                    return;
                }
        });

        window.app.listen('changePlaylist', function(id) {
            self.unSelectAll();
            self.setSelected(id);
        });

        this.element.addEventListener('click', function(event) {

            let target = event.target;
            while (target.dataset.childID == null && target != self.element) {
                target = target.parentNode;
            }

            if (target == self.element) {
                return true;
            }

            window.app.changePlaylist(target.dataset.childID);
        });

    }


    /**
     * method : _contextMenuSetup (private)
     * class  : CollectionBar
     * desc   : Setup a context menu for Add library button and listen
     **/
    _contextMenuSetup() {
        this.newLibMenu = new ContextMenu(this.newButton, null, 'click');
        this.newLibMenu.addEntry(null, 'New Library', function() {
            window.app.requestNewLibrary();
        });
        this.newLibMenu.addEntry(null, 'New Playlist', function() {
            window.app.requestNewPlaylist();
        });
    }

}