/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  ListView class - classical list view                                               *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var ListView = function(playlistId, tracks, cookies) {
    this.listView = null;
    this.playlistId = playlistId;
    this.tracks = tracks;
    this.cookies = cookies;
    this.entries = [];
    this.entriesSelected = {};
    this.dblClick = false;

    this.contextMenu = new ContextMenu();

    this.header = {
        container: null,
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

        this.initHeader();
        this._eventListener();

        this.addEntries(this.tracks);
        this.computePositions();
    },


    initHeader: function() {
        this.header.container = document.createElement("div");
        this.header.container.className = "columnHeader";

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

        this.header.container.appendChild(this.header.duration);
        this.header.container.appendChild(this.header.title);
        this.header.container.appendChild(this.header.artist);
        this.header.container.appendChild(this.header.composer);
        this.header.container.appendChild(this.header.performer);
        this.header.container.appendChild(this.header.album);
        this.header.container.appendChild(this.header.genre);
        this.header.container.appendChild(this.header.bitRate);
        this.header.container.appendChild(this.header.year);

        //document.getElementById("mainContainer").appendChild(this.header.container);
    },


    showListView: function() {
        document.getElementById("mainContainer").appendChild(this.header.container);
        document.getElementById("mainContainer").appendChild(this.listView);

    },

    hideListView: function() {
        document.getElementById("mainContainer").removeChild(this.header.container);
        document.getElementById("mainContainer").removeChild(this.listView);
        // TODO : remove header too
    },


    addEntries: function(tracks) {
        for (var i = 0; i < tracks.length ;++i)
            this.entries.push(new ListViewEntry(tracks[i], this.listView, i));
    },


    removeEntries: function() {
        for (var i = 0; i < this.entries.length ;++i) {
            this.listView.removeChild(this.entries[i].entry)
        }

        // To the GC, and beyond
        this.entries = [];
    },


    sortBy: function(argument, ascending) {
        this.removeEntries();
        this.tracks.sort(sortObjectArrayBy(argument, ascending));
        this.addEntries(this.tracks);
        this.computePositions();
    },


    viewClicked: function(event) {
        var that = this;
        var target = event.target;
        // TODO : fix when target is null => when user click outside left or right of the listview
        while(target.parentNode !== this.listView) {
            target = target.parentNode;
        }

        var id = target.dataset.listViewID;

        if (this.dblClick) {
            JSONParsedPostRequest(
                "ajax/getTrackPathByID/",
                this.cookies,
                JSON.stringify({
                    TRACK_ID: this.entries[id].entry.id
                }),
                function(response) {
                    if (response.RESULT === "FAIL") {
                        new Notification("Bad format.", response.ERROR);
                    } else {
                        var cover = response.COVER;
                        if (cover === null || cover === undefined) { cover = "../static/img/covers/default.jpg"; }

                        window.app.trackPreview.setVisible();
                        window.app.trackPreview.changeTrack(that.entries[id].track, cover);
                        window.app.topbar.changeMoodbar(that.entries[id].entry.id);
                        window.app.player.changeTrack("../" + response.PATH);
                        window.app.player.play();
                    }
                }
            );

            return;
        }
        this.dblClick = true;
        window.setTimeout(function() { that.dblClick = false; }, 400);

        var newState = !this.entriesSelected[id];

        if (!event.ctrlKey && newState === true) { this.unSelectAll(); }

        this.entriesSelected[id] = newState;
        this.entries[id].setIsSelected(newState);
    },


    toggleContextMenu: function(event) {
        var target = event.target;

        while (target.parentNode !== this.listView && target.tagName !== 'BODY') {
            target = target.parentNode;
        }

        if (target.tagName === 'BODY') { return false; }

        var id = target.dataset.listViewID;
        
        if (!this.entries[id].getIsSelected()) {
            this.unSelectAll();
            this.entries[id].setIsSelected(true);
            this.entriesSelected[id] = true;
        }
        // TODO : update contextMenu selection attriutes
        this.contextMenu.updateSelectedEntries(this.entriesSelected);
        this.contextMenu.toggleVisibilityLock(event);
    },


    computePositions: function() {
        for (i = 0; i < this.entries.length ;++i) {
            this.entries[i].computePosition();
        }
    },


    unSelectAll: function() {
        this.entriesSelected = {};
        for (var i = 0; i < this.entries.length ;++i)
            if (this.entries[i].getIsSelected())
                this.entries[i].setIsSelected(false);
    },


    _eventListener: function() {
        var that = this;

        this.listView.oncontextmenu = this.listView.oncontextmenu = function() { return false; }; // Disabling right click on ListView
        this.listView.addEventListener("contextmenu", this.toggleContextMenu.bind(this));
        this.listView.addEventListener("click", this.viewClicked.bind(this));

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
