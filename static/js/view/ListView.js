var ListView = function(tracks) {
    this.listView = null;
    this.tracks = tracks;

    this.init();
};

ListView.prototype = {
    init: function() {
        this.listView = document.createElement("div");
        this.listView.id ="listView";

        this.initColumnBar();

        this.addTracks(this.tracks);
        document.getElementById("mainContainer").appendChild(this.listView);
    },

    initColumnBar: function() {
        var columnBar = document.createElement("div");
        columnBar.className = "columnHeader";

        var title    = document.createElement("div");
//        var titleResize    = document.createElement("div");
        var artist   = document.createElement("div");
        var composer = document.createElement("div");
        var album    = document.createElement("div");
        var genre    = document.createElement("div");
        var year     = document.createElement("div");

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
            tracks[i].createListViewEntry(this.listView);
        }
    }
};
