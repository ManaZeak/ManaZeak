/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  ContextMenu class - handle the context menu on right click                         *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var ContextMenu = function() {
    this.contextMenu = null;
    this.outside = document.body;
    this.isVisible = false;


    this._init();
};


ContextMenu.prototype = {

    _init: function() {
        this.contextMenu = mkElem("div");
        this.contextMenu.id = "contextMenu";
        this._eventListener();

        document.body.appendChild(this.contextMenu);
    },


    addVisibilityLock: function() {
        if (!this.contextMenu.className.match(/(?:^|\s)contextMenuLocked(?!\S)/)) {
            this.contextMenu.className += "contextMenuLocked";
        }
    },


    removeVisibilityLock: function() {
        if (this.contextMenu.className.match(/(?:^|\s)contextMenuLocked(?!\S)/)) {
            this.contextMenu.className = this.contextMenu.className.replace(/(?:^|\s)contextMenuLocked(?!\S)/g, '');
        }
    },


    toggleVisibilityLock: function(event) {
        if (!this.isVisible) {
            this.isVisible = !this.isVisible;
            this.contextMenu.style.top  = event.pageY + "px";
            this.contextMenu.style.left = event.pageX + "px";
            this.addVisibilityLock();
        } else {
            this.isVisible = !this.isVisible;
            this.removeVisibilityLock();
        }
    },


    clickOutside: function(event) {
        if (!getById("contextMenu").contains(event.target) && this.isVisible) {
            this.isVisible = !this.isVisible;
            this.removeVisibilityLock();
        }
    },


    moveContext: function(event) {
        this.contextMenu.style.top  = event.pageY + "px";
        this.contextMenu.style.left = event.pageX + "px";
    },


    _eventListener: function() {
        this.outside.addEventListener("click", this.clickOutside.bind(this), false);
    },


    getIsVisible: function() { return this.isVisible; }
};
