var Track = function(track) {
    this.uiTrack = null;
    this.isSelected = false;

    this.init(track);
};

Track.prototype = {
    init: function(track) {
        this.title    = track.title;
        this.artist   = track.artist;
        this.composer = track.composer;
        this.album    = track.album;
        this.genre    = track.genre;
        this.year     = track.year;
    },

    createListViewEntry: function() {
        this.uiTrack = document.createElement("div");
        this.uiTrack.className = "trackContainer";

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

        title.innerHTML    = this.title;
        artist.innerHTML   = this.artist;
        composer.innerHTML = this.composer;
        album.innerHTML    = this.album;
        genre.innerHTML     = this.genre;
        year.innerHTML     = this.year;

        this.uiTrack.appendChild(title);
        this.uiTrack.appendChild(artist);
        this.uiTrack.appendChild(composer);
        this.uiTrack.appendChild(album);
        this.uiTrack.appendChild(genre);
        this.uiTrack.appendChild(year);

        //this.uiTrack.addEventListener("dblclick", this.test.bind(this));

        document.getElementById("listView").appendChild(this.uiTrack);
    },

    toggleSelected: function() {
        if (this.isSelected) {
            this.isSelected = !this.isSelected;
            this.uiTrack.style.background = "none";
        } else {
            this.isSelected = !this.isSelected;
            this.uiTrack.style.background = "red";
        }
    }
};
