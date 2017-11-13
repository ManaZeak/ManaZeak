App.prototype.togglePlay = function() {
    this.player.togglePlay();
};


App.prototype.stopPlayback = function() {
    this.player.stopPlayback();
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