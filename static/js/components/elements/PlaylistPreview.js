/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  PlaylistPreview class - handle the playlist info container (right/footbar)         *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var PlaylistPreview = function(container) {
    // UI
    this.ui = {
        container: document.createElement("DIV"),
        thumb:  document.createElement("IMG"),
        cover:  document.createElement("IMG"),
        name:  document.createElement("LI"),
        total: document.createElement("LI"),
        duration:  document.createElement("LI"),
        repeatShuffle: document.createElement("LI"),
        repeat:   document.createElement("SPAN"),
        genre:  document.createElement("SPAN"),
        shuffle: document.createElement("SPAN"),
        thumbTooltip: document.createElement("SPAN")
    };

    this.ui.container.id = "playlistPreview";

    this.tooltipWrapper = document.createElement("DIV");
    this.tooltipWrapper.className = "tooltipWrapper";

    this.ui.cover.id = "playlistPreviewCover";
    this.ui.cover.src = "../static/img/utils/defaultcover.jpg";

    this.ui.thumb.id = "playlistPreviewThumb";
    this.ui.thumb.src = "../static/img/utils/defaultcover.jpg";
    this.ui.thumbTooltip.className = "tooltipPlaylistCover";

    this.ui.thumbTooltip.appendChild(this.ui.thumb);
    this.tooltipWrapper.appendChild(this.ui.cover);
    this.tooltipWrapper.appendChild(this.ui.thumbTooltip);

    this.listContainer = document.createElement("UL");

    this.ui.name.id = "playlistPreviewName";
    this.ui.total.id = "playlistPreviewTotal";
    this.ui.duration.id = "playlistPreviewDuration";
    this.ui.repeat.id = "playlistPreviewRepeat";
    this.ui.shuffle.id = "playlistPreviewShuffle";

    this.ui.repeatShuffle.appendChild(this.ui.repeat);
    this.ui.repeatShuffle.appendChild(this.ui.shuffle);

    this.listContainer.appendChild(this.ui.name);
    this.listContainer.appendChild(this.ui.total);
    this.listContainer.appendChild(this.ui.duration);
    this.listContainer.appendChild(this.ui.repeatShuffle);

    this.ui.container.appendChild(this.listContainer);
    this.ui.container.appendChild(this.tooltipWrapper);

    container.appendChild(this.ui.container);
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
        // TODO : link to App.controler event
        this.ui.repeat.innerHTML = !window.app.player.getIsLooping() ? "Repeat off" : "Repeat on";
        //this.ui.shuffle.innerHTML = !window.app.player.getIsShuffle() ? "Shuffle off" : "Shuffle on";
    },


    setVisible: function(visible) {
        this.ui.container.style.opacity  = visible ? 1 : 0;
    }
};
