/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  PlaylistPreview class - handle the playlist info container (right/footbar)         *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var PlaylistPreview = function(container) {
    this.container = document.createElement("DIV");
    this.container.id = "playlistPreview";

    // UI
    this.ui = {
        container: document.createElement("DIV"),
        cover:     document.createElement("DIV"),
        thumb:     document.createElement("DIV"),
        name:      document.createElement("DIV"),
        total:     document.createElement("DIV"),
        duration:  document.createElement("DIV"),
        repeat:    document.createElement("DIV"),
        shuffle:   document.createElement("DIV")
    };

    this.ui.container.id = "playlistPreview";
    this.ui.cover.id     = "playlistPreviewCover";
    this.ui.thumb.id     = "playlistPreviewThumb";
    this.ui.name.id      = "playlistPreviewName";
    this.ui.total.id     = "playlistPreviewTotal";
    this.ui.duration.id  = "playlistPreviewDuration";
    this.ui.repeat.id    = "playlistPreviewRepeat";
    this.ui.shuffle.id   = "playlistPreviewShuffle";

    this.container.appendChild(this.ui.container);
    this.container.appendChild(this.ui.cover);
    this.container.appendChild(this.ui.thumb);
    this.container.appendChild(this.ui.name);
    this.container.appendChild(this.ui.total);
    this.container.appendChild(this.ui.duration);
    this.container.appendChild(this.ui.repeat);
    this.container.appendChild(this.ui.shuffle);
    container.appendChild(this.container);
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
