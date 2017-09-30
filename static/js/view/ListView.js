/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  ListView class - classical list view                                               *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var ListView = function(tracks) {
    this.listView = null;
    this.tracks = tracks;
    this.entries = [];

    this.init();
};


ListView.prototype = {

    init: function() {
        this.listView = mkElem("div");
        this.listView.id ="listView";

        this.initColumnBar();

        this.addTracks(this.tracks);
        getById("mainContainer").appendChild(this.listView);
    },


    initColumnBar: function() {
        var columnBar = mkElem("div");
        columnBar.className = "columnHeader";

        var title    = mkElem("div");
//        var titleResize    = document.createElement("div");
        var artist   = mkElem("div");
        var composer = mkElem("div");
        var album    = mkElem("div");
        var genre    = mkElem("div");
        var year     = mkElem("div");

        title.className    = "title field";
//        titleResize.id    = "titleResize";
//        titleResize.className    = "resize";
        artist.className   = "artist field";
        composer.className = "composer field";
        album.className    = "album field";
        genre.className    = "genre field";
        year.className     = "year field";

        title.innerHTML    = "Title";
        artist.innerHTML   = "Artist";
        composer.innerHTML = "Composer";
        album.innerHTML    = "Album";
        genre.innerHTML    = "Genre";
        year.innerHTML     = "Year";

        columnBar.appendChild(title);
//        columnBar.appendChild(titleResize);
        columnBar.appendChild(artist);
        columnBar.appendChild(composer);
        columnBar.appendChild(album);
        columnBar.appendChild(genre);
        columnBar.appendChild(year);

        this.listView.appendChild(columnBar);
    },


    addTracks: function(tracks) {
        for (var i = 0; i < tracks.length ;++i) {
            this.newEntry(tracks[i]);
        }
    },


    newEntry: function(track) {
        var entry = mkElem("div");
        entry.id = track.id.track;
        entry.className = "trackContainer";

        var title    = mkElem("div");
        var artist   = mkElem("div");
        var composer = mkElem("div");
        var album    = mkElem("div");
        var genre    = mkElem("div");
        var year     = mkElem("div");

        title.className    = "title field";
        artist.className   = "artist field";
        composer.className = "composer field";
        album.className    = "album field";
        genre.className     = "genre field";
        year.className     = "year field";

        title.innerHTML    = track.title;
        artist.innerHTML   = track.artist;
        composer.innerHTML = track.composer;
        album.innerHTML    = track.album;
        genre.innerHTML    = track.genre;
        year.innerHTML     = track.year;

        entry.appendChild(title);
        entry.appendChild(artist);
        entry.appendChild(composer);
        entry.appendChild(album);
        entry.appendChild(genre);
        entry.appendChild(year);

        // TODO : store listenners, and add single click listenner
        entry.addEventListener("dblclick", this.toggleSelected.bind(this));

        this.entries.push(entry);
        this.listView.appendChild(entry);
    },


    toggleSelected: function() {
        // TODO : console.log(this.ui.entry.getBoundingClientRect());
        if (this.isSelected) {
            this.isSelected = !this.isSelected;
            this.ui.entry.style.background = "none";
        } else {
            this.isSelected = !this.isSelected;
            this.ui.entry.style.background = "red";
        }
    }
};
