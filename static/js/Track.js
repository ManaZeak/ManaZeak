var Track = function(track) {
    this.uiTrack = null;
    this.isSelected = false;
    this.track = track;
};

Track.prototype = {

    init: function() {
        // TODO : convert json inc object to real tracks
    },


    createListViewEntry: function(listView) {
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

        title.innerHTML    = this.track.TITLE;
        artist.innerHTML   = "--";
        composer.innerHTML = this.track.COMPOSER;
        album.innerHTML    = "--";
        genre.innerHTML     = "--";
        year.innerHTML     = this.track.YEAR;

        this.uiTrack.appendChild(title);
        this.uiTrack.appendChild(artist);
        this.uiTrack.appendChild(composer);
        this.uiTrack.appendChild(album);
        this.uiTrack.appendChild(genre);
        this.uiTrack.appendChild(year);

        this.uiTrack.addEventListener("dblclick", this.toggleSelected.bind(this));

        listView.appendChild(this.uiTrack);
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
