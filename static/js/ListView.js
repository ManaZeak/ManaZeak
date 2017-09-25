var ListView = function() {
    this.tracksToLoad = [];
    this.tracks = [];

    this.init();
};

ListView.prototype = {
    init: function() {
        this.initColumnBar();

        var track = {
            title: "Le Pudding",
            artist: "Chinese Man",
            composer: "Chinese Man",
            album: "Racing With The Sun",
            genre: "Dubstep",
            year: "2004"
        };

        var track2 = {
            title: "On'n On",
            artist: "Justice",
            composer: "Justice",
            album: "Audio, Video, Disco",
            genre: "DnB",
            year: "2010"
        };

        var track3 = {
            title: "Music Sound Better With You",
            artist: "Stardust",
            composer: "Stardust",
            album: "Disco Sheat",
            genre: "Hip Hop",
            year: "1999"
        };

        this.tracksToLoad[0] = track;
        this.tracksToLoad[1] = track2;
        this.tracksToLoad[2] = track3;

        this.addTracks(this.tracksToLoad);
    },

    initColumnBar: function() {
        var columnBar = document.createElement("div");
        columnBar.className = "columnHeader";

        var title    = document.createElement("div");
        var artist   = document.createElement("div");
        var composer = document.createElement("div");
        var album    = document.createElement("div");
        var genre    = document.createElement("div");
        var year     = document.createElement("div");

        title.className    = "title";
        artist.className   = "artist";
        composer.className = "composer";
        album.className    = "album";
        genre.className     = "genre";
        year.className     = "year";

        title.innerHTML    = "Title";
        artist.innerHTML   = "Artist";
        composer.innerHTML = "Composer";
        album.innerHTML    = "Album";
        genre.innerHTML     = "Genre";
        year.innerHTML     = "Year";

        columnBar.appendChild(title);
        columnBar.appendChild(artist);
        columnBar.appendChild(composer);
        columnBar.appendChild(album);
        columnBar.appendChild(genre);
        columnBar.appendChild(year);

        document.getElementById("listView").appendChild(columnBar);
    },

    addTracks: function(tracks) {
        for (var i = 0; i < tracks.length ;++i) {
            // TODO : viewPort to only load visible items
            var newTrack = new Track(tracks[i]);

            (i % 2 === 0) ? newTrack.createListViewEntry(true) : newTrack.createListViewEntry(false);
            //newTrack.createListViewEntry();
            newTrack.uiTrack.addEventListener("click", newTrack.toggleSelected.bind(newTrack));
            // TODO : selction mode using ctrl, otherwise unselect

            this.tracks.push(newTrack);
        }
    }
};
