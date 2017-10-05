/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  ListView class - classical list view                                               *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var ListView = function(tracks) {
    this.listView = null;
    this.tracks = tracks;
    this.entries = [];
    this.entriesListeners = [];
    this.entriesSelected = [];

    this.contextMenu = new ContextMenu();

    this.header = {
        duration:  null,
        title:     null,
        artist:    null,
        composer:  null,
        performer: null,
        album:     null,
        genre:     null,
        bitRate:   null,
        year:      null
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

    this.init();
};


ListView.prototype = {

    init: function() {
        this.listView = document.createElement("div");
        this.listView.id ="listView";

        this.initColumnHeader();
        this._eventListener();

        this.addEntries(this.tracks);
        document.getElementById("mainContainer").appendChild(this.listView);
        this.computePositions();
    },


    initColumnHeader: function() {
        var columnBar = document.createElement("div");
        columnBar.className = "columnHeader";

        this.header.duration  = document.createElement("div");
        this.header.title     = document.createElement("div");
        this.header.artist    = document.createElement("div");
        this.header.composer  = document.createElement("div");
        this.header.performer = document.createElement("div");
        this.header.album     = document.createElement("div");
        this.header.genre     = document.createElement("div");
        this.header.bitRate   = document.createElement("div");
        this.header.year      = document.createElement("div");

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

        columnBar.appendChild(this.header.duration);
        columnBar.appendChild(this.header.title);
        columnBar.appendChild(this.header.artist);
        columnBar.appendChild(this.header.composer);
        columnBar.appendChild(this.header.performer);
        columnBar.appendChild(this.header.album);
        columnBar.appendChild(this.header.genre);
        columnBar.appendChild(this.header.bitRate);
        columnBar.appendChild(this.header.year);

        this.listView.appendChild(columnBar);
    },


    addEntries: function(tracks) {
        var that = this;

        for (var i = 0; i < tracks.length ;++i) {
            var id = this.entries.push(new ListViewEntry(tracks[i], this.listView));
            // TODO : Handle dble click
            this.entriesListeners.push(this.entries[(id - 1)].getEntry().addEventListener("click", that.trackClicked.bind(that)));
        }
    },


    removeEntries: function() {
        for (var i = 0; i < this.entries.length ;++i) {
            this.listView.removeChild(this.entries[i].entry)
        }

        // To the GC, and beyond
        this.entries = [];
        this.entriesListeners = [];
    },


    sortBy: function(argument, ascending) {
        this.removeEntries();
        this.tracks.sort(sortObjectArrayBy(argument, ascending));
        this.addEntries(this.tracks);
        this.computePositions();
    },


    trackClicked: function(event) {
        var targetIndex = this.collision(event);

        if (this.entriesSelected.length === 0) { // No entries is selected
            this.entries[targetIndex].toggleSelected();
            this.entries[targetIndex].setIsSelected(true);
            this.entriesSelected.push(this.entries[targetIndex]);
        }

        else if (event.ctrlKey) { // User pressed ctrl : multi selection
            if (!this.entries[targetIndex].getIsSelected()) {
                this.entries[targetIndex].toggleSelected();
                this.entries[targetIndex].setIsSelected(true);
                this.entriesSelected.push(this.entries[targetIndex]);
            }

            else {
                this.entries[targetIndex].toggleSelected();
                this.entries[targetIndex].setIsSelected(false);

                for (var i = 0; i < this.entriesSelected.length ;++i) {
                    if (this.entriesSelected[i].entry.id === this.entries[targetIndex].entry.id) {
                        this.entriesSelected.splice(i, 1);
                    }
                }
            }
        }

        else { // Selection isn't empty and user clicked without ctrl
            // TODO : push entrie to entriesSelected

            if (!this.entries[targetIndex].getIsSelected()) {
                this.unselectAll();
                this.entries[targetIndex].toggleSelected();
                this.entries[targetIndex].setIsSelected(true);
                this.entriesSelected.push(this.entries[targetIndex]);
            }

            else {
                this.entries[targetIndex].toggleSelected();
                this.entries[targetIndex].setIsSelected(false);

               for (i = 0; i < this.entriesSelected.length ;++i) {
                    if (this.entriesSelected[i].entry.id === this.entries[targetIndex].entry.id) {
                        this.entriesSelected.splice(i, 1);
                    }
                }
            }
        }
    },


    toggleContextMenu: function(event) {
        var targetIndex = this.collision(event);

        if (targetIndex !== -1 && !this.entries[targetIndex].getIsSelected()) {
            this.unselectAll();
            this.entries[targetIndex].toggleSelected();
            this.entries[targetIndex].setIsSelected(true);
            this.entriesSelected.push(this.entries[targetIndex]);
        }
        // TODO : update contextMenu selection attriutes
        this.contextMenu.updateSelectedEntries(this.entriesSelected);
        this.contextMenu.toggleVisibilityLock(event);
    },


    collision: function(event) {
        for (var i = 0; i < this.entries.length ;++i) {
            if (event.pageX > this.entries[i].boundingRect.x
             && event.pageX < this.entries[i].boundingRect.x + this.entries[i].boundingRect.width
             && event.pageY > this.entries[i].boundingRect.y
             && event.pageY < this.entries[i].boundingRect.y + this.entries[i].boundingRect.height) {
                return i;
            }
        }

        return -1;
    },


    computePositions: function() {
        for (i = 0; i < this.entries.length ;++i) {
            this.entries[i].computePosition();
        }
    },


    unselectAll: function() {
        this.entriesSelected = [];

        for (var i = 0; i < this.entries.length ;++i) {
            if (this.entries[i].getIsSelected()) {
                this.entries[i].toggleSelected();
                this.entries[i].setIsSelected(false);
            }
        }
    },


    _eventListener: function() {
        var that = this;

        this.listView.oncontextmenu = this.listView.oncontextmenu = function() { return false; }; // Disabling right click on ListView
        this.listView.addEventListener("contextmenu", this.toggleContextMenu.bind(this));

//        this.contextMenu.getContextMenu().addEventListener("click", this.sendAttributesToContextMenu.bind(this));

        // Sorting listeners
        this.header.duration.addEventListener("click", function() {
            that.sort.isDurationAsc = !that.sort.isDurationAsc;
            that.sortBy("duration", that.sort.isDurationAsc);
        });
        this.header.title.addEventListener("click", function() {
            that.sort.isTitleAsc = !that.sort.isTitleAsc;
            that.sortBy("title", that.sort.isTitleAsc);
        });
        this.header.artist.addEventListener("click", function() {
            that.sort.isArtistAsc = !that.sort.isArtistAsc;
            that.sortBy("artist", that.sort.isArtistAsc);
        });
        this.header.composer.addEventListener("click", function() {
            that.sort.isComposerAsc = !that.sort.isComposerAsc;
            that.sortBy("composer", that.sort.isComposerAsc);
        });
        this.header.performer.addEventListener("click", function() {
            that.sort.isPerformerAsc = !that.sort.isPerformerAsc;
            that.sortBy("performer", that.sort.isPerformerAsc);
        });
        this.header.album.addEventListener("click", function() {
            that.sort.isAlbumAsc = !that.sort.isAlbumAsc;
            that.sortBy("album", that.sort.isAlbumAsc);
        });
        this.header.genre.addEventListener("click", function() {
            that.sort.isGenreAsc = !that.sort.isGenreAsc;
            that.sortBy("genre", that.sort.isGenreAsc);
        });
        this.header.bitRate.addEventListener("click", function() {
            that.sort.isBiteRateAsc = !that.sort.isBiteRateAsc;
            that.sortBy("bitRate", that.sort.isBiteRateAsc);
        });
        this.header.year.addEventListener("click", function() {
            that.sort.isYearAsc = !that.sort.isYearAsc;
            that.sortBy("year", that.sort.isYearAsc);
        });
    }
};
