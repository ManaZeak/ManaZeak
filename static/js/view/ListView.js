/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  ListView class - classical list view                                               *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var ListView = function(tracks) {
    this.listView = null;
    this.tracks = tracks;

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

        title.className    = "title";
//        titleResize.id    = "titleResize";
//        titleResize.className    = "resize";
        artist.className   = "artist";
        composer.className = "composer";
        album.className    = "album";
        genre.className    = "genre";
        year.className     = "year";

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
            tracks[i].newListViewEntry(this.listView);
        }
    }
};
