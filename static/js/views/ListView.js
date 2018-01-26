/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  ListView class                         *
 *                                         *
 *  Classical list view                    *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

import { JSONParsedPostRequest, sortObjectArrayBy } from '../utils/Utils.js'
import ListViewEntry from './entries/ListViewEntry.js'
import PlaylistView from '../core/PlaylistView.js'
import MultiSelect from '../utils/MultiSelect.js'
import TrackInfo from '../components/elements/TrackInfo.js'
import ContextMenu from '../utils/ContextMenu.js'
import Modal from '../utils/Modal.js'

class ListView extends PlaylistView {

    constructor(data, isLibrary, id) {
        super();
        this.isLibrary = isLibrary;
        this.id        = id;
        // The index of the last track on which the view was centered
        this.lastTrackCenter = 0;
        this.isActive = false;
        this.selector = new MultiSelect();
        this._init(data);
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : getDataFromPlaylist (public)
     * class  : ListView
     * desc   : Get data from a given playlist
     * return : {object} playlist - The playlist to retrieve data from
     **/
    getDataFromPlaylist(playlist) {
        return playlist.tracks;
    }


    /**
     * method : getEntryById (public)
     * class  : ListView
     * desc   : Get an entry by its ID
     * arg    : {int} id - The ID to retrieve
     * return : {object} ListView entry
     **/
    getEntryById(id) {
        for (let i = 0; i < this.entries.length; ++i) {
            if (this.entries[i].track.id.track === id) {
                return this.entries[i].track;
            }
        }
    }


    /**
     * method : getFirstEntry (public)
     * class  : ListView
     * desc   : returns the first entry of the ListView
     * return : {object} ListView first entry
     **/
    getFirstEntry() {
        if (this.entries.length > 0) {
            return this.entries[0].track;
        }

        else {
            new Notification("ERROR", "Empty Playlist", "This playlist has no tracks");
            return null;
        }
    }


    /**
     * method : getNextEntry (public)
     * class  : ListView
     * desc   : Returns the next entry after the selected one
     * return : {object} ListView next entry
     **/
    getNextEntry() {
        for (let i = 0; i < this.entries.length; ++i) {
            if (this.entries[i].getIsSelected()) {
                return this.entries[(i + 1) % this.entries.length].track;
            }
        }
    }


    /**
     * method : getPreviousEntry (public)
     * class  : ListView
     * desc   : Returns the previous entry before the selected one
     * return : {object} ListView previous entry
     **/
    getPreviousEntry() {
        for (let i = 0; i < this.entries.length; ++i) {
            if (this.entries[i].getIsSelected()) {
                return this.entries[(i - 1 + this.entries.length) % this.entries.length].track;
            }
        }
    }


    /**
     * method : isLastEntry (public)
     * class  : ListView
     * desc   : Test if selected track is the last entry in ListView
     * return : {bool} true if yes
     **/
    isLastEntry() {
        return !!this.entries[this.entries.length - 1].getIsSelected();
    }


    /**
     * method : refreshTracks (public)
     * class  : ListView
     * desc   : Refresh ListView entries (+ column header)
     * arg    : {[object]} tracks - Tracks array
     **/
    refreshTracks(tracks) {
        while (this.listView.firstChild) {
            this.listView.removeChild(this.listView.firstChild);
        }

        this.entries = [];
        this._addEntries(tracks);
        this.contextMenu.reattach();

        this.container.appendChild(this.header.container);
        this.container.appendChild(this.listView);
    }


    /**
     * method : setSelected (public)
     * class  : ListView
     * desc   : Select an entry using a Track object
     * arg    : {object} track - The track to select
     **/
    setSelected(track) {
        for (let i = 0; i < this.entries.length; ++i) {
            if (this.entries[i].getIsSelected()) { //  Un-selecting all
                this.entries[i].setIsSelected(false);
            }

            if (this.entries[i].track.id.track === track.id.track) { // Selecting the one
                this.entries[i].setIsSelected(true);
            }
        }
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _addEntries (private)
     * class  : ListView
     * desc   : Add entries in ListView for a given tracks collection
     * arg    : {[object]} tracks - Tracks array to display
     **/
    _addEntries(tracks) {
        for (let i = 0; i < tracks.length; ++i) {
            this.entries.push(new ListViewEntry(tracks[i], this.listView));
        }
    }


    /**
     * method : _addIDToSelect (private)
     * class  : ListView
     * desc   : TODO
     * arg    : {int} id - TODO
     *          {object} event - TODO
     **/
    _addIDToSelect(id, event) {
        // Clicked outside of the entries
        if (id === undefined || id === null) {
            this._unSelectAll();
            return true;
        }

        this.entries[id].setIsSelected(this.selector.add(id, event.ctrlKey));
    }


    /**
     * method : _contextMenuSetup (private)
     * class  : ListView
     * desc   : TODO
     **/
    _contextMenuSetup() {
        let that             = this;
        this.contextMenu     = null;
        this.contextMenu     = new ContextMenu(this.listView, function(event) {
            clearTimeout(that.hoveredTimeout);
            that.trackInfo.setVisible(false);

            let target       = event.target;
            while (target.parentNode != null && target.dataset.childID == null) {
                target       = target.parentNode;
            }

            if(that.entries[target.dataset.childID].getIsSelected() == false)
                that._addIDToSelect(target.dataset.childID, event);
        });

        this.contextMenu.addEntry(null, "Add to Queue", function() {
            let selected     = that.selector.get();
            for(let i = 0; i < selected.length; ++i) {
                window.app.pushQueue(that.entries[selected[i]].track);
            }
        });

        this.contextMenu.addEntry(null, "Edit tags", function() {
            let ids          = that.selector.get();
            let tracks       = new Array(ids.length);

            for(let i = 0; i < ids.length; ++i) {
                tracks[i]    = that.entries[ids[i]].track;
            }

            window.app.updateTracksInfo(tracks, function() {
                new Modal("editTag", tracks).open();
            })
        });

        this.contextMenu.addEntry(null, "Download track", function() {
            let nbTracks = that.selector.getSize();
            if(nbTracks == 1)
                window.app.downloadTrack(that.entries[that.selector.get()[0]].track);
            else if(nbTracks > 0) {
                let tracks = new Array(nbTracks);
                let ids = that.selector.get();
                for(let i = 0; i < nbTracks; ++i)
                    tracks[i] = that.entries[ids[i]].track;
                window.app.downloadTracksZip(tracks);
            }
        });


        this.contextMenu.addEntry('playlists', "Add to playlist");

        //TODO: Add and remove playlists on the fly (listen to window.app.playlists)
        let playlists = window.app.getPlaylists();
        for (let i = 0; i < playlists.length; ++i) {
            this.contextMenu.addEntry(['playlists', null], playlists[i].name, function () {
                let tracks = that.selector.get();
                for(let t = 0; t < tracks.length; t++)
                    tracks[t] = that.entries[tracks[t]].track;
                window.app.addTracksToPlaylist(playlists[i], tracks);
            });
        }

        this.contextMenu.addEntry(['playlists', null], "New playlist", function() {
            window.app.requestNewPlaylist();
        });

        if (!this.isLibrary) {
            this.contextMenu.addEntry(null, "Remove track", function() {
                let tracks = that.selector.get();
                for(let t = 0; t < tracks.length; t++)
                    tracks[t] = that.entries[tracks[t]].track;
                window.app.removeTracksFromPlaylist(window.app.playlists.get(that.id), tracks);
            });
        }
    }


    /**
     * method : _createUI (private)
     * class  : ListView
     * desc   : Build UI elements
     **/
    _createUI(data) {
        this.listView               = document.createElement("DIV");
        this.listView.id            = "listView";
        this.container.id           = "listViewWrapper";

        this._initHeader();
        this._addEntries(data);
        this.container.appendChild(this.header.container);
        this.container.appendChild(this.listView);

        if (this.entries.length * 26 > screen.height) { // TODO : Value to adjust
            this.header.container.classList.add("columnHeaderOffset");
        }

        this.trackInfo      = new TrackInfo(this.container);
        this.hoveredTrack   = null;
        this.hoveredTimeout = null;

        this._contextMenuSetup();
    }


    /**
     * method : _eventListener (private)
     * class  : ListView
     * desc   : ListView event listeners
     **/
    _eventListener() {
        let that = this;
        this.listView.onscroll = function() {
            that.trackInfo.setVisible(false);
        };
        this.listView.addEventListener('mousemove', function(event) {
            that._showTrackInfo(event);
        }, true);
        this.listView.addEventListener('mouseleave', function(event) {
            window.clearTimeout(that.hoveredTimeout);
            // We need to enqueue that event because mouseleave will get fired before trackinfo's mouseenter
            if (event.target == that.listView)
                window.setTimeout(function() {
                    that.trackInfo.setVisible(false);
                }, 0);
        });
        this.listView.addEventListener("click", this._viewClicked.bind(this));

        // Sorting listeners
        this.header.container.addEventListener('click', function(event) {
            if(event.target == that.header.container)
                return;
            let target = event.target;
            while(target.parentNode != that.header.container)
                target = target.parentNode;

            let sorter = that.sort[target.dataset.sorter];
            if(sorter) {
                sorter.isAsc ^= true;
                that._sortBy(target.dataset.sorter, sorter.isAsc);
                that._resetEntriesBackground();
            }
        });
        window.app.listen('changeTrack', function(track) {
            that._centerOnTrack(track, false);
        });
        window.app.listen('changeView', function(view) {
            that.isActive = view == that;
            if (that.isActive)
                that._centerOnTrack(that.lastTrackCenter, true);
        });

        window.app.listen("stopPlayback", function() {
            that._unSelectAll();
        });
        this.selector.listen('clear', this._unSelectAll.bind(this));
    }


    /**
     * method : _init (private)
     * class  : ListView
     * desc   : Create view and append data to it
     * arg    : {object} data - Tracks
     **/
    _init(data) {
        this.listView        = null;
        this.entries         = [];
        this.trackInfo       = null;
        this.dblClick        = null;
        this.contextMenu     = null;
        this.header = {
            container:      null,
            duration:       null,
            title:          null,
            artist:         null,
            composer:       null,
            performer:      null,
            album:          null,
            genre:          null,
            bitRate:        null,
            year:           null
        };
        this.sort = {
            duration:   { isAsc:    false },
            title:      { isAsc:    false },
            artist:     { isAsc:    false },
            composer:   { isAsc:    false },
            performer:  { isAsc:    false },
            album:      { isAsc:    false },
            genre:      { isAsc:    false },
            bitRate:    { isAsc:    false },
            year:       { isAsc:    false }
        };
        this._createUI(data);
        this._eventListener();
    }


    /**
     * method : _initHeader (private)
     * class  : ListView
     * desc   : Init ListView header
     **/
    _initHeader() {
        this.header.container                = document.createElement("DIV");
        this.header.duration                 = document.createElement("DIV");
        this.header.title                    = document.createElement("DIV");
        this.header.artist                   = document.createElement("DIV");
        this.header.composer                 = document.createElement("DIV");
        this.header.album                    = document.createElement("DIV");
        this.header.genre                    = document.createElement("DIV");
        this.header.bitRate                  = document.createElement("DIV");
        this.header.year                     = document.createElement("DIV");

        this.header.container.className      = "columnHeader";
        this.header.duration.className       = "col-duration";
        this.header.title.className          = "col-title";
        this.header.artist.className         = "col-artist";
        this.header.composer.className       = "col-composer";
        this.header.album.className          = "col-album";
        this.header.genre.className          = "col-genre";
        this.header.bitRate.className        = "col-bitRate";
        this.header.year.className           = "col-year";
        this.header.duration.innerHTML       = "Duration";
        this.header.title.innerHTML          = "Title";
        this.header.artist.innerHTML         = "Artist";
        this.header.composer.innerHTML       = "Composer";
        this.header.album.innerHTML          = "Album";
        this.header.genre.innerHTML          = "Genre";
        this.header.bitRate.innerHTML        = "BitRate";
        this.header.year.innerHTML           = "Year";
        this.header.duration.dataset.sorter  = "duration";
        this.header.title.dataset.sorter     = "title";
        this.header.artist.dataset.sorter    = "artist";
        this.header.composer.dataset.sorter  = "composer";
        this.header.album.dataset.sorter     = "album";
        this.header.genre.dataset.sorter     = "genre";
        this.header.bitRate.dataset.sorter   = "bitRate";
        this.header.year.dataset.sorter      = "year";

        this.header.container.appendChild(this.header.duration);
        this.header.container.appendChild(this.header.title);
        this.header.container.appendChild(this.header.artist);
        this.header.container.appendChild(this.header.composer);
        this.header.container.appendChild(this.header.album);
        this.header.container.appendChild(this.header.genre);
        this.header.container.appendChild(this.header.bitRate);
        this.header.container.appendChild(this.header.year);
    }


    /**
     * method : _resetEntriesBackground (private)
     * class  : ListView
     * desc   : Reset entries background alternance
     **/
    _resetEntriesBackground() {
        for (let i = 0; i < this.entries.length; ++i) {
            this.entries[i].setBackground(i);
        }
    }


    /**
     * method : _showTrackInfo (private)
     * class  : ListView
     * desc   : Show TrackInfo on hovered track
     * arg    : {object} event - Mouse event
     **/
    _showTrackInfo(event) {
        if (event.target == this.listView) {
            return this.trackInfo.setVisible(false);
        }

        let target = event.target;
        while (target.parentNode != this.listView) {
            target = target.parentNode;
        }

        if (target.dataset.childID !== undefined) { // Avoid right click to cause error
            if (target != this.hoveredTrack || this.trackInfo.isVisible() == false) {
                this.hoveredTrack = target;
                this.trackInfo.setVisible(false);
                window.clearTimeout(this.hoveredTimeout);

                let that = this;
                this.hoveredTimeout = window.setTimeout(function () {
                    let self = that;
                    that.trackInfo.updateGeometry(that.hoveredTrack.getBoundingClientRect(), that.header.duration.offsetWidth);
                    that.trackInfo.updateInfo(that.entries[that.hoveredTrack.dataset.childID].track, function () {
                        self.trackInfo.setVisible(true)
                    });
                }, 1000);
            }
        }
    }


    /**
     * method : _sortBy (private)
     * class  : ListView
     * desc   : Sort entries
     * arg    : {string} argument - The argument to sort array by
     *          {bool} ascending - Sort way
     **/
    _sortBy(argument, ascending) {
        //TODO: Optimise this for bigger playlists (need custom sort) UPDATE: Actually might not be possible
        this.entries.sort(sortObjectArrayBy(argument, ascending, "track"));
        this.listView.innerHTML = "";

        for (let i = 0; i < this.entries.length; i++) {
            this.entries[i].insert(this.listView);
        }

        this.contextMenu.reattach();
    }


    /**
     * method : _unSelectAll (private)
     * class  : ListView
     * desc   : Unselect all entries in ListView
     **/
    _unSelectAll() {
        for (let i = 0; i < this.entries.length ;++i) {
            if (this.entries[i].getIsSelected()) {
                this.entries[i].setIsSelected(false);
            }
        }
    }


    /**
     * method : _centerOnTrack (private)
     * class  : ListView
     * desc   : Center the listview on a track
     * arg    : {bool} useIndex - whether to treat track as an object or an integer
     *          {object} track - The track on which to center
     *          OR
     *          {integer} track - The index of the track on which to center
     **/
    _centerOnTrack(track, useIndex) {
        let i = track;
        if (useIndex !== true) {
            for (i = 0; i < this.entries.length; ++i) {
                if (this.entries[i].track == track) {
                    break;
                }
            }
        }

        if (i >= this.entries.length) {
            return;
        }

        let relativeDelta = this.entries[i].entry.offsetTop + this.entries[i].entry.scrollHeight / 2;

        if (this.entries[i].entry.offsetParent != this.listView) {
            relativeDelta -= this.listView.offsetTop;
        }

        if (this.isActive) {
            this.lastTrackCenter = i;
        }

        this.listView.scrollTop = relativeDelta - this.listView.clientHeight / 2;
    }


    /**
     * method : _viewClicked (private)
     * class  : ListView
     * desc   : On ListView clicked
     * arg    : {object} event - Mouse event
     **/
    _viewClicked(event) {
        let that   = this;
        let target = event.target;

        if (target === this.listView) {
            this._unSelectAll();
            return true;
        }

        while (target.parentNode !== this.listView) {
            target = target.parentNode;
        }

        let id = target.dataset.childID;
        if (this.dblClick == id) {
            window.app.changeTrack(this.entries[id].track, false);
            return;
        }

        this.dblClick = id;
        window.setTimeout(function() {
            that.dblClick = null;
        }, 500);

        this._addIDToSelect(id, event);
    }

}

export default ListView
