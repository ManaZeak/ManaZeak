App.prototype.togglePlay = function() {
    this.player.togglePlay();
};


App.prototype.stopPlayback = function() {
    this.changePageTitle("ManaZeak");
    this.player.stopPlayback();
    this.topBar.resetMoodbar();
};


App.prototype.toggleShuffle = function() {
    this.activePlaylist.toggleShuffle();
};


App.prototype.toggleRepeat = function() {
    this.activePlaylist.toggleRepeat();
};


App.prototype.next = function() {
    if (this.queue.isEmpty() == false) { this.popQueue();                     }
    else                               { this.activePlaylist.playNextTrack(); }
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
    if (volume > 1)      { volume = 1; }
    else if (volume < 0) { volume = 0; }

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
    if(this.player.isMuted) {
        this.unmute();
        this.setVolume(this.player.oldVolume);
    }

    else {
        this.mute();
        this.setVolume(0);
    }
};


App.prototype.changeTrack = function(track, previous) {
    let that = this;

    this.footBar.progressBar.resetProgressBar();

    JSONParsedPostRequest(
        "ajax/getTrackPathByID/",
        JSON.stringify({
            TRACK_ID: track.id.track,
            PREVIOUS: previous
        }),
        function(response) {
            if (response.RESULT === "FAIL") {
                new Notification("ERROR", "Bad format.", response.ERROR);
            }

            else {
                that.footBar.trackPreview.changeTrack(track);
                that.topBar.changeMoodbar(track.id.track);
                that.player.changeTrack(".." + response.PATH, track.id.track);
                that.changePageTitle(response.PATH);
                that.activePlaylist.updateView(track);
                that.togglePlay();
            }
        }
    );
};


App.prototype.changePlaylist = function() {

    this.footBar.playlistPreview.changePlaylist(this.activePlaylist); // TODO : get Lib/Play image/icon
};


App.prototype.changePageTitle = function(path) {
    // IDEA : Recontruct frrom Track attributes bc special char won't display as below ... (?/etc.)
    document.title = path.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, ''); // Automatically remove path to file and any extension
};


App.prototype.getAllPlaylistsTracks = function(begin) {
    for (let i = begin; i < this.playlists.length; ++i) {
        this.playlists[i].getPlaylistsTracks(undefined);
    }
};


App.prototype.refreshUI = function() {
    //this.playlists[this.activePlaylist - 1].refreshViews();
    this.topBar.refreshTopBar();
    this.footBar.playlistPreview.changePlaylist(this.activePlaylist); // TODO : get Lib/Play image/icon
    this.footBar.progressBar.refreshInterval(this.player.getPlayer());
};


App.prototype.pushQueue = function(track) {
    this.queue.enqueue(track);
};


App.prototype.popQueue = function () {
    this.changeTrack(this.queue.dequeue(), false);
};


App.prototype.reverseQueue = function(reverse) {
    this.queue.setReverse(reverse);
};


App.prototype.moveQueue = function(element, newPos) {
    this.queue.slide(element, newPos);
};

App.prototype.logOut = function() {
    getRequest(
        "logout",
        function() {
            location.reload();
        }
    );
};


App.prototype.displayStats = function() {
    this.clearMainContainer();

    let tmp = new Stats(this.mainContainer);
};

App.prototype.clearMainContainer = function() {
    while (this.mainContainer.firstChild) {
        this.mainContainer.removeChild(this.mainContainer.firstChild);
    }
};