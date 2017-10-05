/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  ListViewEntry class - list view entry                                              *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var ListViewEntry = function(track, listView) {
    this.entry = document.createElement("div");

    this.entry.id = "track" + track.id.track;
    this.entry.className = "trackContainer";
    this.track = track;

    var duration        = document.createElement("div");
    var title           = document.createElement("div");
    var artist          = document.createElement("div");
    var composer        = document.createElement("div");
    var performer       = document.createElement("div");
    var album           = document.createElement("div");
    var genre           = document.createElement("div");
    var bitRate         = document.createElement("div");
    var year            = document.createElement("div");

    duration.className  = "col-duration";
    title.className     = "col-title";
    artist.className    = "col-artist";
    composer.className  = "col-composer";
    performer.className = "col-performer";
    album.className     = "col-album";
    genre.className     = "col-genre";
    bitRate.className   = "col-bitRate";
    year.className      = "col-year";

    duration.innerHTML  = secondsToTimecode(track.duration);
    title.innerHTML     = track.title;
    artist.innerHTML    = track.artist;
    composer.innerHTML  = track.composer;
    performer.innerHTML = track.performer;
    album.innerHTML     = track.album;
    genre.innerHTML     = track.genre;
    bitRate.innerHTML   = Math.round(track.bitRate / 1000) + " kbps";
    year.innerHTML      = track.year;

    this.entry.appendChild(duration);
    this.entry.appendChild(title);
    this.entry.appendChild(artist);
    this.entry.appendChild(composer);
    this.entry.appendChild(performer);
    this.entry.appendChild(album);
    this.entry.appendChild(genre);
    this.entry.appendChild(bitRate);
    this.entry.appendChild(year);

    // ListViewEntry internal attributes
    this.boundingRect = null;
    this.isSelected = false;

    listView.appendChild(this.entry);
};


ListViewEntry.prototype = {
    toggleSelected: function() {
        if (this.isSelected) {
            this.entry.style.background = "none";
        } else {
            this.entry.style.background = "red";
        }
    },


    computePosition: function() {
        this.boundingRect = this.entry.getBoundingClientRect();
    },


    getEntry: function() { return this.entry; },
    getIsSelected: function() { return this.isSelected; },

    setIsSelected: function(isSelected) { this.isSelected = isSelected }
};
