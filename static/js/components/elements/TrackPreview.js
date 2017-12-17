/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  TrackPreview class                             *
 *                                                 *
 *  Handle the track info container                *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

let TrackPreview = function(container) {

    this._createUI(container);
    this._eventListener();
};


TrackPreview.prototype = {

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : changeTrack (public)
     * class  : TrackPreview
     * desc   : Change track details
     * arg    : {object} track - New track to get info from
     **/
    changeTrack: function(track) {
        this.ui.cover.src        = track.cover;
        this.ui.thumb.src        = track.cover;
        this.ui.title.innerHTML  = track.title;
        this.ui.artist.innerHTML = track.artist;
        this.ui.album.innerHTML  = track.album;
        this.ui.year.innerHTML   = track.year;

        if (track.genre) { this.ui.year.innerHTML += "&nbsp;&nbsp;-&nbsp;&nbsp;"; }
        this.ui.genre.innerHTML  = track.genre;

        this._setVisible(true);
    },

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : TrackPreview
     * desc   : Build UI elements
     **/
    _createUI: function(container) {

        this.ui = {
            container:    document.createElement("DIV"),
            thumb:        document.createElement("IMG"),
            cover:        document.createElement("IMG"),
            title:        document.createElement("LI"),
            artist:       document.createElement("LI"),
            album:        document.createElement("LI"),
            genreYear:    document.createElement("LI"),
            year:         document.createElement("SPAN"),
            genre:        document.createElement("SPAN"),
            thumbTooltip: document.createElement("SPAN")
        };
        this.tooltipWrapper            = document.createElement("DIV");
        this.listContainer             = document.createElement("UL");

        this.ui.container.id           = "trackPreview";
        this.tooltipWrapper.className  = "tooltipWrapper";
        this.ui.cover.id               = "trackPreviewCover";
        this.ui.thumb.id               = "trackPreviewThumb";
        this.ui.thumbTooltip.className = "tooltipTrackCover";
        this.ui.title.id               = "trackPreviewTitle";
        this.ui.artist.id              = "trackPreviewArtist";
        this.ui.album.id               = "trackPreviewAlbum";
        this.ui.year.id                = "trackPreviewYear";
        this.ui.genre.id               = "trackPreviewGenre";

        this.ui.cover.src              = "/static/img/utils/defaultcover.svg";
        this.ui.thumb.src              = "/static/img/utils/defaultcover.svg";

        this.ui.thumbTooltip.appendChild(this.ui.thumb);
        this.tooltipWrapper.appendChild(this.ui.cover);
        this.tooltipWrapper.appendChild(this.ui.thumbTooltip);
        this.ui.genreYear.appendChild(this.ui.year);
        this.ui.genreYear.appendChild(this.ui.genre);
        this.listContainer.appendChild(this.ui.title);
        this.listContainer.appendChild(this.ui.artist);
        this.listContainer.appendChild(this.ui.album);
        this.listContainer.appendChild(this.ui.genreYear);
        this.ui.container.appendChild(this.tooltipWrapper);
        this.ui.container.appendChild(this.listContainer);
        container.appendChild(this.ui.container);
    },


    /**
     * method : _eventListener (private)
     * class  : TrackPreview
     * desc   : TrackPreview event listeners
     **/
    _eventListener: function() {
        let that = this;

        window.app.addListener(["togglePlay", "changeTrack"], function() {
            that.setVisible(true);
        });
        window.app.addListener("stopPlayback", function() {
            that.setVisible(false);
        });
    },


    /**
     * method : setVisible (private)
     * class  : TrackPreview
     * desc   : Change visibility status of TrackPreview
     * arg    : {bool} visible
     **/
    _setVisible: function(visible) {
        this.ui.container.style.opacity = visible ? 1 : 0;
    }

};
