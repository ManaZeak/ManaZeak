/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  ListViewEntry class - list view entry                                              *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let ListViewEntry = function(track, listView) {
    this.entry = document.createElement("DIV");
    this.entry.className = "trackContainer";

    this.track = track;

    let duration        = document.createElement("DIV");
    let title           = document.createElement("DIV");
    let artist          = document.createElement("DIV");
    let composer        = document.createElement("DIV");
    let performer       = document.createElement("DIV");
    let album           = document.createElement("DIV");
    let genre           = document.createElement("DIV");
    let bitRate         = document.createElement("DIV");
    let year            = document.createElement("DIV");

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

        if (this.isSelected) { this.entry.classList.add("mzk-selected");    }
        else                 { this.entry.classList.remove("mzk-selected"); }
    }
};
