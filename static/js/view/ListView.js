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

        this.initColumnHeader();

        this.addTracks(this.tracks);
        getById("mainContainer").appendChild(this.listView);
    },


    initColumnHeader: function() {
        var columnBar = mkElem("div");
        columnBar.className = "columnHeader";

        var duration    = mkElem("div");
        var title    = mkElem("div");
        var artist   = mkElem("div");
        var composer = mkElem("div");
        var album    = mkElem("div");
        var genre    = mkElem("div");
        var year     = mkElem("div");

        duration.className    = "col-duration field";
        title.className    = "col-title field";
        artist.className   = "col-artist field";
        composer.className = "col-composer field";
        album.className    = "col-album field";
        genre.className    = "col-genre field";
        year.className     = "col-year field";

        duration.innerHTML    = "Duration";
        title.innerHTML    = "Title";
        artist.innerHTML   = "Artist";
        composer.innerHTML = "Composer";
        album.innerHTML    = "Album";
        genre.innerHTML    = "Genre";
        year.innerHTML     = "Year";

        columnBar.appendChild(duration);
        columnBar.appendChild(title);
        columnBar.appendChild(artist);
        columnBar.appendChild(composer);
        columnBar.appendChild(album);
        columnBar.appendChild(genre);
        columnBar.appendChild(year);

        this.listView.appendChild(columnBar);
    },


    addTracks: function(tracks) {
        for (var i = 0; i < tracks.length ;++i) {
            this.entries.push(new ListViewEntry(tracks[i], this.listView));
        }
    }
};
