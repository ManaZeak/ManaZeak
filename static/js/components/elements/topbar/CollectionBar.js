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

import Modal from '../../../utils/Modal.js'
import ContextMenu from '../../../utils/ContextMenu.js'

class PlaylistCollectionEntry {

    constructor(playlist, container) {
        //TODO: free the listeners
        this.isLibrary             = playlist.getIsLibrary();
        this.playlist              = playlist;
        this.entry                 = document.createElement("DIV");
        this.entry.dataset.childID = playlist.id;
        this.label                 = document.createElement('SPAN');
        this.label.innerHTML       = playlist.getName();
        this.entry.appendChild(this.label);

        if (this.isLibrary) {
            this.entry.className   = "library";
        }

        else {
            this.entry.className   = "playlist";
        }

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
     * method : rename
     * class  : CollectionBarEntry
     * desc   : Rename an entry
     * arg    : {string} name
     **/
    rename(name) {
        this.label.innerHTML = name;
    }


    /**
     * method : setIsSelected (public)
     * class  : PlaylistBarEntry
     * desc   : Set entry as selected/!selected
     * arg    : {bool} isSelected
     **/
    setIsSelected(isSelected) {
        this.isSelected = isSelected;

        if (this.isLibrary) {
            if (this.isSelected) {
                this.entry.classList.add("librarySelected");
            }

            else {
                this.entry.classList.remove("librarySelected");
            }
        }

        else {
            if (this.isSelected) {
                this.entry.classList.add("playlistSelected");
            }

            else {
                this.entry.classList.remove("playlistSelected");
            }
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
            that.modal       = new Modal("renamePlaylist", {
                name: that.playlist.name,
                id:   that.playlist.id
            });
            that.modal.open();
        });
        this.contextMenu.addEntry(null, "Delete", function() {
            that.modal       = new Modal("deletePlaylist", {
                playlist: that.playlist
            });
            that.modal.open();
        });
    }



    /**
     * method : _createOptionButton (private)
     * class  : ListView
     * desc   : Append option button to entry
     **/
    _createOptionButton() {
        let that           = this;
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

import MzkObject from '../../../core/MzkObject.js'

class CollectionBar extends MzkObject {

    constructor(collection, container) {
        super();
        this.collection = collection;
        this.entries    = [];
        this.newLibMenu = null;
        this._createUI(container);
        this._eventListener();
        this._contextMenuSetup();
        this.refresh();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //


    /**
     * method : refresh (private)
     * class  : CollectionBar
     * desc   : Refresh the display from the collection
     **/
    refresh() {
        this.libsContainer.innerHTML = '';
        this.playContainer.innerHTML = '';
        this.entries                 = [];

        let that = this;
        this.collection.forEach(function() {
            if (this.getIsLibrary() === true) {
                that.entries.push(new PlaylistCollectionEntry(this, that.libsContainer));
            }

            else {
                that.entries.push(new PlaylistCollectionEntry(this, that.playContainer));
            }
        });
        let activePlaylist           = window.app.getActivePlaylist();
        if (activePlaylist) {
            that.setSelected(activePlaylist.id);
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


    /**
     * method : unSelectAll (public)
     * class  : CollectionBar
     * desc   : Unselect every entry in playlist bar
     **/
    unSelectAll() {
        for (let i = 0; i < this.entries.length; ++i) {
            this.entries[i].setIsSelected(false);
        }
    }

//  --------------------------------  PRIVATE METHODS  ---------------------------------  //

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


    /**
     * method : _createUI (private)
     * class  : CollectionBar
     * desc   : Build UI elements
     * arg    : {object} container - The CollectionBar container
     **/
    _createUI(container) {
        this.element                 = document.createElement('DIV');
        this.libsContainer           = document.createElement('DIV');
        this.playContainer           = document.createElement('DIV');
        this.newButton               = document.createElement("DIV");

        this.libsContainer.className = 'no-padding';
        this.playContainer.className = 'no-padding';
        this.newButton.innerText     = '+';

        this.element.appendChild(this.libsContainer);
        this.element.appendChild(this.playContainer);
        this.element.appendChild(this.newButton);

        container.appendChild(this.element);
    }


    /**
     * method : _eventListener (private)
     * class  : CollectionBar
     * desc   : CollectionBar event listeners
     **/
    _eventListener() {
        let that = this;
        this.collection.listen(['add', 'remove', 'clear'], function() {
            that.refresh();
        });
        this.collection.listen('rename', function(id, name) {
            for (let i = 0; i < that.entries.length; ++i)
                if (that.entries[i].getID() == id) {
                    that.entries[i].rename(name);
                    return;
                }
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
        window.app.listen('changePlaylist', function(id) {
            that.unSelectAll();
            that.setSelected(id);
        });
    }

}

export default CollectionBar