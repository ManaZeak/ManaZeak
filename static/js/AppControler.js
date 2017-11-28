App.prototype.togglePlay = function() {
    this.player.togglePlay();
};


App.prototype.stopPlayback = function() {
    this.player.stopPlayback();
};


App.prototype.toggleShuffle = function() {
    this.activePlaylist.toggleShuffle();
};


App.prototype.toggleRepeat = function() {
    this.activePlaylist.toggleRepeat();
};


App.prototype.next = function() {
    if(this.queue.isEmpty() == false)
        this.popQueue();
    else
        this.activePlaylist.playNextTrack();
};


App.prototype.previous = function() {
    this.activePlaylist.playPreviousTrack();
};


App.prototype.repeatTrack = function() {
    this.player.repeatTrack();
};


App.prototype.fastForward = function(amount) {
    this.player.getPlayer().currentTime += amount;
};


App.prototype.rewind = function(amount) {
    this.player.getPlayer().currentTime -= amount;
};


App.prototype.setVolume = function(volume) {
    if(volume > 1)
        volume = 1;
    else if(volume < 0)
        volume = 0;

    this.player.getPlayer().volume = precisionRound(volume, 2);
};


App.prototype.adjustVolume = function(amount) {
    this.setVolume(this.player.getPlayer().volume + amount);
};


App.prototype.mute = function() {
    this.player.mute();
};


App.prototype.unmute = function() {
    this.player.unmute();
};


App.prototype.toggleMute = function() {
    if(this.player.isMuted)
        this.unmute();
    else
        this.mute();
};


App.prototype.changeTrack = function(track) {
    var that = this;

    JSONParsedPostRequest(
        "ajax/getTrackPathByID/",
        JSON.stringify({
            TRACK_ID: track.id.track
        }),
        function(response) {
            if (response.RESULT === "FAIL") {
                new Notification("Bad format.", response.ERROR);
            } else {
                that.footBar.trackPreview.setVisible(true);
                that.footBar.trackPreview.changeTrack(track, response.COVER);
                that.topBar.changeMoodbar(track.id.track);
                that.player.changeTrack(".." + response.PATH, track.id.track);
                that.activePlaylist.updateView(track);
                that.togglePlay();
            }
        }
    );
};


App.prototype.changePlaylist = function() {
    this.footBar.playlistPreview.changePlaylist(this.activePlaylist); // TODO : get Lib/Play image/icon
};


App.prototype.getAllPlaylistsTracks = function() {
    for (var i = 1; i < this.playlists.length ;++i) {
        this.playlists[i].getPlaylistsTracks(undefined);
    }
};


App.prototype.refreshUI = function() {
    //this.playlists[this.activePlaylist - 1].refreshViews();
    this.topBar.refreshTopBar();
    this.footBar.playlistPreview.changePlaylist(this.activePlaylist); // TODO : get Lib/Play image/icon
};


App.prototype.pushQueue = function(track) {
    this.queue.enqueue(track);
};


App.prototype.popQueue = function () {
    this.changeTrack(this.queue.dequeue());
};
