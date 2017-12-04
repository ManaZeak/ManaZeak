/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  TrackPreview class - handle the track info container (left/footbar)                *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var TrackInfo = function(container) {

    this.volumeLockId = -1;

    this._createUI(container);
    this._eventListener();
};


TrackInfo.prototype = {

    setVisible: function(visible) {
        //this.ui.container.style.opacity  = visible ? 1 : 0;
    },


    isVisible: function() {
        return !!(this.ui.container.style.opacity = 1);
    },


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
    },


    updateInfos: function() {

    },

    _eventListener: function() {

    }
};
