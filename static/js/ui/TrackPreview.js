/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  TrackPreview class - handle the track info container (left/footbar)                *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var TrackPreview = function() {
    // UI
    this.ui = {
        cover: document.getElementById("trackPreviewCover"),
        title: document.getElementById("trackPreviewTitle"),
        artist: document.getElementById("trackPreviewArtist"),
        album: document.getElementById("trackPreviewAlbum"),
        year: document.getElementById("trackPreviewYear"),
        genre: document.getElementById("trackPreviewGenre")
    };
};


TrackPreview.prototype = {

    changeTrack: function(track, cover) {
        // TODO : handle cover
        this.ui.cover.src = cover;
        this.ui.title.innerHTML = track.title;
        this.ui.artist.innerHTML = track.artist;
        this.ui.album.innerHTML = track.album;
        this.ui.year.innerHTML = track.year;
        this.ui.genre.innerHTML = track.genre;
    }
};
