App.prototype.togglePlay = function() {
    this.player.togglePlay();
};


App.prototype.stopPlayback = function() {
    this.player.stopPlayback();
    this.trackPreview.setVisible(false);
};


App.prototype.toggleMute = function() {
    this.player.toggleMute();
};


App.prototype.toggleShuffle = function() {
    this.activePlaylist.toggleShuffle();
};


App.prototype.toggleRepeat = function() {
    this.activePlaylist.toggleRepeat();
};


App.prototype.next = function() {
    this.activePlaylist.playNextTrack();
};


App.prototype.previous = function() {
    this.activePlaylist.playPreviousTrack();
};

App.prototype.changeTrack = function(track) {

    JSONParsedPostRequest(
        "ajax/getTrackPathByID/",
        this.cookies,
        JSON.stringify({
            TRACK_ID: track.id.track
        }),
        function(response) {
            if (response.RESULT === "FAIL") {
                new Notification("Bad format.", response.ERROR);
            } else {
                window.app.trackPreview.setVisible(true);
                window.app.trackPreview.changeTrack(track, response.COVER);
                window.app.topBar.changeMoodbar(track.id.track);
                window.app.player.changeTrack(".." + response.PATH, track.id.track);
                window.app.player.play();
            }
        }
    );
};