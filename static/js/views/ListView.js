/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  ListViewEntry sub class                *
 *                                         *
 *  A list view entry                      *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

class ListViewEntry {

    constructor(track, listView) {

        this.track = track;
        this.entry           = document.createElement("DIV");
        let duration         = document.createElement("DIV");
        let title            = document.createElement("DIV");
        let artist           = document.createElement("DIV");
        let composer         = document.createElement("DIV");
        let performer        = document.createElement("DIV");
        let album            = document.createElement("DIV");
        let genre            = document.createElement("DIV");
        let bitRate          = document.createElement("DIV");
        let year             = document.createElement("DIV");

        this.entry.className = "trackContainer";
        duration.className   = "col-duration";
        title.className      = "col-title";
        artist.className     = "col-artist";
        composer.className   = "col-composer";
        performer.className  = "col-performer";
        album.className      = "col-album";
        genre.className      = "col-genre";
        bitRate.className    = "col-bitRate";
        year.className       = "col-year";

        duration.innerHTML   = secondsToTimecode(track.duration);
        title.innerHTML      = track.title;
        artist.innerHTML     = track.artist;
        composer.innerHTML   = track.composer;
        performer.innerHTML  = track.performer;
        album.innerHTML      = track.album;
        genre.innerHTML      = track.genre;
        bitRate.innerHTML    = Math.round(track.bitRate / 1000) + " kbps";
        year.innerHTML       = track.year;

        this.entry.appendChild(duration);
        this.entry.appendChild(title);
        this.entry.appendChild(artist);
        this.entry.appendChild(composer);
        //this.entry.appendChild(performer);
        this.entry.appendChild(album);
        this.entry.appendChild(genre);
        this.entry.appendChild(bitRate);
        this.entry.appendChild(year);

        // ListViewEntry internal attributes
        this.isSelected = false;

        this.insert(listView);
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : insert (public)
     * class  : ListViewEntry
     * desc   : Insert the entry in the list
     * return : {object} listView - The HTML container
     **/
    insert(listView) {
        this.entry.dataset.childID = listView.children.length;
        listView.appendChild(this.entry);
    }


    /**
     * method : setIsSelected (public)
     * class  : ListViewEntry
     * desc   : Set the entry as selected/!selected
     * return : {bool} isSelected
     **/
    setIsSelected(isSelected) {
        this.isSelected = isSelected;

        if (this.isSelected) { this.entry.classList.add("mzk-selected");    }
        else                 { this.entry.classList.remove("mzk-selected"); }
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getIsSelected() { return this.isSelected; }

}


/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  ListView class                         *
 *                                         *
 *  Classical list view                    *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

class ListView extends PlaylistView {

    constructor(data, isLibrary, id) {

        super();
        this.isLibrary = isLibrary;
        this.id        = id;
        // The index of the last track on which the view was centered
        this.lastTrackCenter = 0;
        this.isActive = false;
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
     * method : _contextMenuSetup (private)
     * class  : ListView
     * desc   : TODO
     **/
    _contextMenuSetup() {
        let that             = this;
        let clickedEntry     = undefined;
        this.contextMenu     = null;
        this.contextMenu     = new ContextMenu(this.listView, function(event) {
            clearTimeout(that.hoveredTimeout);
            that.trackInfo.setVisible(false);

            let target       = event.target;
            while (target.parentNode != null && target.dataset.childID == null) {
                target       = target.parentNode;
            }

            if (target.parentNode != null) { clickedEntry = target.dataset.childID; }
            else                           { clickedEntry = undefined;              }
        });

        this.contextMenu.addEntry(null, "Add to Queue", function() {
            if (clickedEntry !== undefined) {
                window.app.pushQueue(that.entries[clickedEntry].track);
            }
        });
        this.contextMenu.addEntry(null, "Download track", function() {
            if (clickedEntry !== undefined) {
                JSONParsedPostRequest(
                    "ajax/download/",
                    JSON.stringify({
                        TRACK_ID: that.entries[clickedEntry].track.id.track
                    }),
                    function(response) {
                        /* response = {
                         *     DONE      : bool
                         *     ERROR_H1  : string
                         *     ERROR_MSG : string
                         *
                         *     PATH      : string
                         * } */
                        if (response.DONE) {
                            let dl      = document.createElement("A");

                            dl.href     = response.PATH;
                            dl.download = response.PATH.replace(/^.*[\\\/]/, '');
                            document.body.appendChild(dl);
                            dl.click();
                            document.body.removeChild(dl);
                            dl.remove();
                        }

                        else {
                            new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                        }
                    }
                );
            }
        });
        this.contextMenu.addEntry('playlists', "Add to playlist");
        let playlists = window.app.getPlaylists();
        for (let i = 0; i < playlists.length; ++i) {
            this.contextMenu.addEntry(['playlists', null], playlists[i].name, function () {
                if (clickedEntry !== undefined) {
                    let tracksId = [];
                    tracksId.push(that.entries[clickedEntry].track.id.track); // TODO : get all selected Tracks

                    JSONParsedPostRequest(
                        "ajax/addTracksToPlaylist/",
                        JSON.stringify({
                            PLAYLIST_ID: playlists[i].id,
                            TRACKS_ID: tracksId
                        }),
                        function (response) {
                            /* response = {
                             *     DONE         : bool
                             *     ERROR_H1     : string
                             *     ERROR_MSG    : string
                             *
                             *     ADDED_TRACKS : int
                             * } */
                            if (response.DONE) {
                                new Notification("INFO", "Track added to " + playlists[i].name, that.entries[clickedEntry].track.title + " has been added to " + playlists[i].name + ".");
                                playlists[i].getPlaylistsTracks();
                            }

                            else {
                                new Notification("ERROR", response.ERROR_H1, response.ERROR.MSG);
                            }
                        }
                    );
                }
            });
        }
        if (!this.isLibrary) {
            this.contextMenu.addEntry(null, "Remove track", function() {
                if (clickedEntry !== undefined) {
                    let tracksId = [];
                    tracksId.push(that.entries[clickedEntry].track.id.track); // TODO : get all selected Tracks

                    JSONParsedPostRequest(
                        "ajax/removeTrackFromPlaylist/",
                        JSON.stringify({
                            PLAYLIST_ID: that.id,
                            TRACKS_ID:   tracksId
                        }),
                        function (response) {
                            /* response = {
                             *     DONE           : bool
                             *     ERROR_H1       : string
                             *     ERROR_MSG      : string
                             *
                             *     REMOVED_TRACKS : int
                             * } */
                            if (response.DONE) {
                                let playlist = window.app.getPlaylistFromId(that.id);

                                if (playlist !== null) {
                                    new Notification("INFO", "Track removed from " + playlist.name, that.entries[clickedEntry].track.title + " has been removed from " + playlist.name + ".");
                                    playlist.getPlaylistsTracks();
                                }
                            }

                            else {
                                new Notification("ERROR", response.ERROR_H1, response.ERROR.MSG);
                            }
                        }
                    );
                }
            });
        }
        this.contextMenu.addEntry(['playlists', null], "New playlist", function() {
            window.app.requestNewPlaylist();
        });
    }


    /**
     * method : _createUI (private)
     * class  : ListView
     * desc   : Build UI elements
     **/
    _createUI(data) {
        this.listView       = document.createElement("DIV");
        this.listView.id    ="listView";

        this._initHeader();
        this._addEntries(data);
        this.container.appendChild(this.header.container);
        this.container.appendChild(this.listView);

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
        this.listView.addEventListener('mousemove', this._showTrackInfo.bind(this), true);
        this.listView.addEventListener('mouseleave', function(event) {
            window.clearTimeout(that.hoveredTimeout);
            //We need to enqueue that event because mouseleave will get fired before trackinfo's mouseenter
            if (event.target == that.listView)
                window.setTimeout(that.trackInfo.setVisible.bind(that.trackInfo, false), 0);
        });
        this.listView.addEventListener("click", this._viewClicked.bind(this));
        // Sorting listeners
        this.header.duration.addEventListener("click", function() {
            that.sort.isDurationAsc = !that.sort.isDurationAsc;
            that._sortBy("duration", that.sort.isDurationAsc);
        });
        this.header.title.addEventListener("click", function() {
            that.sort.isTitleAsc = !that.sort.isTitleAsc;
            that._sortBy("title", that.sort.isTitleAsc);
        });
        this.header.artist.addEventListener("click", function() {
            that.sort.isArtistAsc = !that.sort.isArtistAsc;
            that._sortBy("artist", that.sort.isArtistAsc);
        });
        this.header.composer.addEventListener("click", function() {
            that.sort.isComposerAsc = !that.sort.isComposerAsc;
            that._sortBy("composer", that.sort.isComposerAsc);
        });
        this.header.performer.addEventListener("click", function() {
            that.sort.isPerformerAsc = !that.sort.isPerformerAsc;
            that._sortBy("performer", that.sort.isPerformerAsc);
        });
        this.header.album.addEventListener("click", function() {
            that.sort.isAlbumAsc = !that.sort.isAlbumAsc;
            that._sortBy("album", that.sort.isAlbumAsc);
        });
        this.header.genre.addEventListener("click", function() {
            that.sort.isGenreAsc = !that.sort.isGenreAsc;
            that._sortBy("genre", that.sort.isGenreAsc);
        });
        this.header.bitRate.addEventListener("click", function() {
            that.sort.isBiteRateAsc = !that.sort.isBiteRateAsc;
            that._sortBy("bitRate", that.sort.isBiteRateAsc);
        });
        this.header.year.addEventListener("click", function() {
            that.sort.isYearAsc = !that.sort.isYearAsc;
            that._sortBy("year", that.sort.isYearAsc);
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
        this.entriesSelected = {};
        this.trackInfo       = null;
        this.dblClick        = false;
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
            isDurationAsc:  false,
            isTitleAsc:     false,
            isArtistAsc:    false,
            isComposerAsc:  false,
            isPerformerAsc: false,
            isAlbumAsc:     false,
            isGenreAsc:     false,
            isBitRateAsc:   false,
            isYearAsc:      false
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
        this.header.container             = document.createElement("DIV");
        this.header.container.className   = "columnHeader";

        this.header.duration              = document.createElement("DIV");
        this.header.title                 = document.createElement("DIV");
        this.header.artist                = document.createElement("DIV");
        this.header.composer              = document.createElement("DIV");
        this.header.performer             = document.createElement("DIV");
        this.header.album                 = document.createElement("DIV");
        this.header.genre                 = document.createElement("DIV");
        this.header.bitRate               = document.createElement("DIV");
        this.header.year                  = document.createElement("DIV");

        this.header.duration.className    = "col-duration";
        this.header.title.className       = "col-title";
        this.header.artist.className      = "col-artist";
        this.header.composer.className    = "col-composer";
        this.header.performer.className   = "col-performer";
        this.header.album.className       = "col-album";
        this.header.genre.className       = "col-genre";
        this.header.bitRate.className     = "col-bitRate";
        this.header.year.className        = "col-year";

        this.header.duration.innerHTML    = "Duration";
        this.header.title.innerHTML       = "Title";
        this.header.artist.innerHTML      = "Artist";
        this.header.composer.innerHTML    = "Composer";
        this.header.performer.innerHTML   = "Performer";
        this.header.album.innerHTML       = "Album";
        this.header.genre.innerHTML       = "Genre";
        this.header.bitRate.innerHTML     = "BitRate";
        this.header.year.innerHTML        = "Year";

        this.header.container.appendChild(this.header.duration);
        this.header.container.appendChild(this.header.title);
        this.header.container.appendChild(this.header.artist);
        this.header.container.appendChild(this.header.composer);
        //this.header.container.appendChild(this.header.performer);
        this.header.container.appendChild(this.header.album);
        this.header.container.appendChild(this.header.genre);
        this.header.container.appendChild(this.header.bitRate);
        this.header.container.appendChild(this.header.year);
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
        this.entriesSelected = {};

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
        if (useIndex !== true)
            for (i = 0; i < this.entries.length; ++i)
                if (this.entries[i].track == track)
                    break;
        if (i >= this.entries.length)
            return;

        let relativeDelta = this.entries[i].entry.offsetTop + this.entries[i].entry.scrollHeight / 2;
        if (this.entries[i].entry.offsetParent != this.listView)
            relativeDelta -= this.listView.offsetTop;

        if (this.isActive)
            this.lastTrackCenter = i;
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

        // Clicked outside of the entries
        if (id === undefined || id === null) {
            this._unSelectAll();
            return true;
        }

        if (this.dblClick) {
            window.app.changeTrack(this.entries[id].track, false);
            return;
        }

        this.dblClick = true;
        window.setTimeout(function() { that.dblClick = false; }, 500);

        let newState = !this.entriesSelected[id];

        if (!event.ctrlKey && newState === true) { this._unSelectAll(); }

        this.entriesSelected[id] = newState;
        this.entries[id].setIsSelected(newState);
    }

}
