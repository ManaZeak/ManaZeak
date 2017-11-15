/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  PlaylistPreview class - handle the playlist info container (right/footbar)         *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var PlaylistPreview = function() {
    // UI
    this.ui = {
        container: document.getElementById("playlistPreview"),
        cover:     document.getElementById("playlistPreviewCover"),
        thumb:     document.getElementById("playlistPreviewThumb"),
        name:      document.getElementById("playlistPreviewName"),
        total:     document.getElementById("playlistPreviewTotal"),
        duration:  document.getElementById("playlistPreviewDuration"),
        repeat:    document.getElementById("playlistPreviewRepeat"),
        shuffle:   document.getElementById("playlistPreviewShuffle")
    };
};


PlaylistPreview.prototype = {

    changePlaylist: function(playlist, cover) {
        // TODO : handle cover smooth transition
        this.ui.cover.src = "../static/img/utils/defaultcover.jpg";
        this.ui.thumb.src = "../static/img/utils/defaultcover.jpg";

        this.ui.name.innerHTML = playlist.name;
        this.ui.total.innerHTML = playlist.trackTotal + " tracks";
        this.ui.duration.innerHTML = "Duration : " + secondsToTimecode(playlist.durationTotal);

        this.updatePlaylistPreview();
    },


    updatePlaylistPreview: function() {
        this.ui.repeat.innerHTML = !window.app.player.getIsLooping() ? "Repeat off" : "Repeat on";
        //this.ui.shuffle.innerHTML = !window.app.player.getIsShuffle() ? "Shuffle off" : "Shuffle on";
    },


    setVisible: function(visible) {
        this.ui.container.style.opacity  = visible ? 1 : 0;
    }
};
