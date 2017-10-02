/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  ListViewEntry class - list view entry                                              *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var ListViewEntry = function(track, listView) {
    this.entry = mkElem("div");

    this.entry.id = track.id.track;
    this.entry.className = "trackContainer";

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

    duration.innerHTML    = secondsToTimecode(track.duration);
    title.innerHTML    = track.title;
    artist.innerHTML   = track.artist;
    composer.innerHTML = track.composer;
    album.innerHTML    = track.album;
    genre.innerHTML    = track.genre;
    year.innerHTML     = track.year;

    this.entry.appendChild(duration);
    this.entry.appendChild(title);
    this.entry.appendChild(artist);
    this.entry.appendChild(composer);
    this.entry.appendChild(album);
    this.entry.appendChild(genre);
    this.entry.appendChild(year);

    listView.appendChild(this.entry);


    // ListViewEntry internal attributes
    this.x = 0;
    this.y = 0;
    this.singleClickEvent = this.entry.addEventListener("click", this.toggleSelected.bind(this));
    this.doubleClickEvent = this.entry.addEventListener("dblClick", this.toggleSelected.bind(this));
};


ListViewEntry.prototype = {
    toggleSelected: function() {
        // TODO : console.log(this.ui.entry.getBoundingClientRect());
        if (this.isSelected) {
            this.isSelected = !this.isSelected;
            this.entry.style.background = "none";
        } else {
            this.isSelected = !this.isSelected;
            this.entry.style.background = "red";
        }
    }
};
