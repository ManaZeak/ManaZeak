/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  TrackPreview class - handle the track info container (left/footbar)                *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var TrackInfo = function(container) {

    this.trackInfoLockId = -1;

    this._createUI(container);
    this._eventListener();
};


TrackInfo.prototype = {

    _createUI: function(container) {
        this.ui = {
            container: document.createElement("DIV"),
            cover: document.createElement("IMG"),
            numbers: document.createElement("P"),

            trackWrapper: document.createElement("DIV"),
            title: document.createElement("P"),
            artist: document.createElement("P"),
            albumArtist: document.createElement("P"),
            composer: document.createElement("P"),
            performer: document.createElement("P"),
            genre: document.createElement("P"),
            album: document.createElement("P"),
            trackDetails: document.createElement("P"),

            suggestionWrapper: document.createElement("DIV")
        };

        this.ui.container.id = "trackInfo";
        this.ui.trackWrapper.id = "trackWrapper";
        this.ui.title.id = "title";
        this.ui.album.id = "album";
        this.ui.numbers.id = "numbers";
        this.ui.genre.id = "album";
        this.ui.suggestionWrapper.id = "suggestionWrapper";

        this.ui.trackWrapper.appendChild(this.ui.title);
        this.ui.trackWrapper.appendChild(this.ui.artist);
        this.ui.trackWrapper.appendChild(this.ui.album);
        this.ui.trackWrapper.appendChild(this.ui.albumArtist);
        this.ui.trackWrapper.appendChild(this.ui.composer);
        this.ui.trackWrapper.appendChild(this.ui.performer);
        this.ui.trackWrapper.appendChild(this.ui.genre);
        this.ui.trackWrapper.appendChild(this.ui.trackDetails);

        this.ui.container.appendChild(this.ui.cover);
        this.ui.container.appendChild(this.ui.numbers);
        this.ui.container.appendChild(this.ui.suggestionWrapper);
        this.ui.container.appendChild(this.ui.trackWrapper);

        container.appendChild(this.ui.container);
    },

    updateGeometry: function(rect, offset) {
        this.ui.container.style.top = (rect.top - 24) + "px"; //
        this.ui.container.style.left = (rect.left + offset + 8) + "px"; // 8 come from the padding in col-title
        this.ui.container.style.height = "200px";
        this.ui.container.style.width = "auto";
    },


    updateInfos: function(track) {
        // TODO : get all metadata from track
        // TODO : update in front with all new infos
        // TODO : display info on container
        // TODO : request 5 top track, or genre like, or random if nothing is related
        this.ui.cover.src = "../static/img/utils/defaultcover.svg";
        //this.ui.cover.src = track.cover;
        this.ui.title.innerHTML = track.title;
        this.ui.artist.innerHTML = track.artist;
        this.ui.albumArtist.innerHTML = "Album Artists : " + track.albumArtist;
        this.ui.composer.innerHTML = "Composer : " + track.composer;
        this.ui.performer.innerHTML = "Performer : " + track.performer;
        this.ui.genre.innerHTML = "Genre : " + track.genre;
        this.ui.album.innerHTML = track.year + " - " + track.album;
        this.ui.numbers.innerHTML = "track 1 / 12&nbsp;-&nbsp;disc 1 / 1";
        this.ui.trackDetails.innerHTML = secondsToTimecode(track.duration) + " - " + track.fileType + " - " + Math.round(track.bitRate / 1000) + "kbps - " + track.sampleRate + "Hz";
    },

    setVisible: function(visible) {
        this.ui.container.style.opacity = visible ? 1 : 0;
        this.closeTrackInfo();
    },


    closeTrackInfo: function() {
        var that = this;
// TODO : find a way to keep trackInfo open while user hover the track that trigger its apparition
        clearTimeout(this.trackInfoLockId);
        this.trackInfoLockId = setTimeout(function() {
            that.resetTrackGeometry();
        }, 1000);
    },


    resetTrackGeometry: function() {
        this.ui.container.style.opacity = 0;
        this.ui.container.style.height = 0;
        this.ui.container.style.width = 0;
    },


    isVisible: function() {
        return !!(this.ui.container.style.opacity = 1);
    },

    lockTrackInfo: function() {
        clearTimeout(this.trackInfoLockId);
    },

    _eventListener: function() {
        this.ui.container.addEventListener("mouseenter", this.lockTrackInfo.bind(this));
        this.ui.container.addEventListener("mouseleave", this.resetTrackGeometry.bind(this));
    }
};
