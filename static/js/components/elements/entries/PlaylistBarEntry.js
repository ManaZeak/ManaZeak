/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  PlaylistBarEntry class                                                             *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var PlaylistBarEntry = function(playlist, playlistBar, id, isLibrary) {

    this.playlist = playlist;

    this.entry = document.createElement("div");
    this.entry.id = playlist.id;
    this.isLibrary = isLibrary;
    this.entry.dataset.childID = id;


    if (this.isLibrary) {
        this.entry.className = "library";
    } else {
        this.entry.className = "playlist";
    }

    this.entry.innerHTML = playlist.getName();

    this.isSelected = false;

    playlistBar.appendChild(this.entry);
};


PlaylistBarEntry.prototype = {

    getId: function() { return this.entry.id; },
    getIsSelected: function() { return this.isSelected; },

    setIsSelected: function(isSelected) {
        this.isSelected = isSelected;
        if (this.isSelected) {
            addVisibilityLock(this.entry, "libraryLocked");
        } else {
            removeVisibilityLock(this.entry, "libraryLocked");
        }
    }
};
