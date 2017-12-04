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
            container: document.createElement("DIV")
        };

        this.ui.container.id = "trackInfo";

        container.appendChild(this.ui.container);
    },

    updateGeometry: function(rect, offset) {
        this.ui.container.style.top = (rect.top - 24) + "px"; //
        this.ui.container.style.left = (rect.left + offset + 8) + "px"; // 8 come from the padding in col-title
        this.ui.container.style.width = "500px";
    },


    updateInfos: function() {

    },

    setVisible: function(visible) {
        var that = this;

        this.ui.container.style.opacity = visible ? 1 : 0;
        this.closeTrackInfo();
    },


    closeTrackInfo: function() {
        var that = this;

        clearTimeout(this.trackInfoLockId);
        this.trackInfoLockId = setTimeout(function() {
            that.ui.container.style.opacity = 0;
            that.ui.container.style.width = 0;
        }, 1500);
    },


    isVisible: function() {
        return !!(this.ui.container.style.opacity = 1);
    },

    _eventListener: function() {
        this.ui.container.addEventListener("mouseenter", clearTimeout(this.trackInfoLockId));
        this.ui.container.addEventListener("mouseleave", this.closeTrackInfo.bind(this));
    }
};
