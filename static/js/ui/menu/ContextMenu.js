/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  ContextMenu class - handle the context menu on right click                         *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var ContextMenu = function() {
    this.contextMenu = null;
    this.entries = {
        editMD: null,
        delete: null,
        queue: null,
        playlist: null
    };
    this.outside = document.body;
    this.isVisible = false;


    this.entriesSelected = {};
    this.modal = new Modal("editMetadata");

    this._init();
};


ContextMenu.prototype = {

    _init: function() {
        this.contextMenu = document.createElement("div");
        this.contextMenu.id = "contextMenu";

        this.entries.editMD = document.createElement("p");
        this.entries.delete = document.createElement("p");
        this.entries.queue = document.createElement("p");
        this.entries.playlist = document.createElement("p");

        this.entries.editMD.innerHTML = "Edit metadata";
        this.entries.delete.innerHTML = "Delete track";
        this.entries.queue.innerHTML = "Add to queue";
        this.entries.playlist.innerHTML = "Add to playlist";

        this.contextMenu.appendChild(this.entries.editMD);
        this.contextMenu.appendChild(this.entries.delete);
        this.contextMenu.appendChild(this.entries.queue);
        this.contextMenu.appendChild(this.entries.playlist);

        this._eventListener();
        this._keyListener();

        document.body.appendChild(this.contextMenu);
    },


    toggleVisibilityLock: function(event) {
        if (!this.isVisible) {
            this.isVisible = !this.isVisible;
            this.contextMenu.style.top  = event.pageY + "px";
            this.contextMenu.style.left = event.pageX + "px";
            addVisibilityLock(this.contextMenu, "contextMenuLocked");
        } else {
            this.isVisible = !this.isVisible;
            removeVisibilityLock(this.contextMenu, "contextMenuLocked");
        }
    },


    clickOutside: function(event) {
        if (!document.getElementById("contextMenu").contains(event.target) && this.isVisible) {
            this.isVisible = !this.isVisible;
            removeVisibilityLock(this.contextMenu, "contextMenuLocked");
        }
    },


    updateSelectedEntries: function(entries) {
        this.entriesSelected = entries;
    },


    editModal: function() {
        this.isVisible = !this.isVisible;
        var that = this;

        removeVisibilityLock(this.contextMenu, "contextMenuLocked");
        this.modal.open();

        function waitingModalOpening(){
            if (!that.modal.getIsOpen()) {
                setTimeout(function() { waitingModalOpening() }, 100);
            } else {
                that.modal.initEditMetadata(that.entriesSelected);
            }
        }
    },


    _eventListener: function() {
        this.outside.addEventListener("click", this.clickOutside.bind(this), false);

        this.entries.editMD.addEventListener("click", this.editModal.bind(this));
    },


    _keyListener: function() {
        var that = this;

        // Key pressed event
        document.addEventListener("keydown", function(event) {
            switch (event.keyCode) {
                case 27: // Esc
                    if (that.isVisible) { that.toggleVisibilityLock(); }
                    break;
                default:
                    break;
            }
        });
    },


    getContextMenu: function() { return this.contextMenu; }
};
