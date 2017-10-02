/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  ListView class - classical list view                                               *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var ListView = function(tracks) {
    this.listView = null;
    this.tracks = tracks;
    this.entries = [];

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
        this.listView = mkElem("div");
        this.listView.id ="listView";

        this.initColumnHeader();
        this._eventListener();

        this.addEntries(this.tracks);
        getById("mainContainer").appendChild(this.listView);
    },


    initColumnHeader: function() {
        var columnBar = mkElem("div");
        columnBar.className = "columnHeader";

        this.header.duration  = mkElem("div");
        this.header.title     = mkElem("div");
        this.header.artist    = mkElem("div");
        this.header.composer  = mkElem("div");
        this.header.performer = mkElem("div");
        this.header.album     = mkElem("div");
        this.header.genre     = mkElem("div");
        this.header.bitRate   = mkElem("div");
        this.header.year      = mkElem("div");

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
        for (var i = 0; i < tracks.length ;++i) {
            this.entries.push(new ListViewEntry(tracks[i], this.listView));
        }
    },


    removeEntries: function() {
        for (var i = 0; i < this.entries.length ;++i) {
            this.listView.removeChild(this.entries[i].entry)
        }

        this.entries = []; // To the GC, and beyond !
    },


    sortBy: function(argument, ascending) {
        this.removeEntries();
        this.tracks.sort(sortObjectArrayBy(argument, ascending));
        this.addEntries(this.tracks);
    },


    _eventListener: function() {
        var that = this;

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
