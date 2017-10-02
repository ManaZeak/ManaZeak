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

        var duration        = mkElem("div");
        var title           = mkElem("div");
        var artist          = mkElem("div");
        var composer        = mkElem("div");
        var performer       = mkElem("div");
        var album           = mkElem("div");
        var genre           = mkElem("div");
        var bitRate         = mkElem("div");
        var year            = mkElem("div");

        duration.className  = "col-duration";
        title.className     = "col-title";
        artist.className    = "col-artist";
        composer.className  = "col-composer";
        performer.className = "col-performer";
        album.className     = "col-album";
        genre.className     = "col-genre";
        bitRate.className   = "col-bitRate";
        year.className      = "col-year";

        duration.innerHTML  = "Duration";
        title.innerHTML     = "Title";
        artist.innerHTML    = "Artist";
        composer.innerHTML  = "Composer";
        performer.innerHTML = "Performer";
        album.innerHTML     = "Album";
        genre.innerHTML     = "Genre";
        bitRate.innerHTML   = "BitRate";
        year.innerHTML      = "Year";

        columnBar.appendChild(duration);
        columnBar.appendChild(title);
        columnBar.appendChild(artist);
        columnBar.appendChild(composer);
        columnBar.appendChild(performer);
        columnBar.appendChild(album);
        columnBar.appendChild(genre);
        columnBar.appendChild(bitRate);
        columnBar.appendChild(year);

        this.listView.appendChild(columnBar);
    },


    addTracks: function(tracks) {
        console.log(tracks);
        for (var i = 0; i < tracks.length ;++i) {
            this.entries.push(new ListViewEntry(tracks[i], this.listView));
        }
    }
};
