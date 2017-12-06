/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  PlaylistBarEntry class                                                             *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let PlaylistBarEntry = function(playlist, playlistBar, id, isLibrary) {

    this.entry = document.createElement("div");
    this.entry.dataset.childID = id;
    this.entry.id = playlist.id;
    this.playlist = playlist;
    this.isLibrary = isLibrary;

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

    getId: function()         { return this.entry.id;   },
    getIsSelected: function() { return this.isSelected; },

    setIsSelected: function(isSelected) {
        this.isSelected = isSelected;

        if (this.isSelected) {
            this.entry.classList.add("librarySelected");
        } else {
            this.entry.classList.remove("librarySelected");
        }
    }
};
