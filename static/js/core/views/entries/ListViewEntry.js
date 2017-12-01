/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  ListViewEntry class - list view entry                                              *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var ListViewEntry = function(track, listView) {
    this.entry = document.createElement("DIV");
    this.entry.className = "trackContainer";

    this.track = track;

    var duration        = document.createElement("DIV");
    var title           = document.createElement("DIV");
    var artist          = document.createElement("DIV");
    var composer        = document.createElement("DIV");
    var performer       = document.createElement("DIV");
    var album           = document.createElement("DIV");
    var genre           = document.createElement("DIV");
    var bitRate         = document.createElement("DIV");
    var year            = document.createElement("DIV");

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
    //this.entry.appendChild(performer);
    this.entry.appendChild(album);
    this.entry.appendChild(genre);
    this.entry.appendChild(bitRate);
    this.entry.appendChild(year);

    // ListViewEntry internal attributes
    this.boundingRect = null;
    this.isSelected = false;

    this.insert(listView);
};


ListViewEntry.prototype = {
    
    insert: function(listView) {
        this.entry.dataset.childID = listView.children.length;
        listView.appendChild(this.entry);
    },

    getIsSelected: function() { return this.isSelected; },

    setIsSelected: function(isSelected) {
        this.isSelected = isSelected;
        if (this.isSelected) {
            this.entry.classList.add("mzk-selected");
            //this.entry.style.background = "red";
        } else {
            this.entry.classList.remove("mzk-selected");
            //this.entry.style.background = "none";
        }
    }
};
