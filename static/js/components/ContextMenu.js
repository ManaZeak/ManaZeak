/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  ContextMenu class - handle the context menu on right click                      *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let ContextMenu = function(parentElement, openCallback, event) {
    this.contextMenu   = null;
    this.parentElement = parentElement;
    this.openCallback  = openCallback;
    this.element       = null;
    this.isVisible     = false;
    this.event         = event ? event : 'contextmenu';

    this._init();
};


ContextMenu.prototype = {

    _init: function() {
        this.contextMenu = new ContextMenuEntry("master", "", null);
        this.contextMenu.activate_event_listener();

        this.element = document.createElement('DIV');
        this.element.id = "mzk-ctx-wrap";
        this.element.appendChild(this.contextMenu.element);
        this.parentElement.insertBefore(this.element, this.parentElement.firstChild);

        this._eventListener();
        this._keyListener();
    },


    addEntry: function(entryPath, displayStr, callback /*, more args for the callback */) {
        let path = entryPath;
        let context;

        if (Array.isArray(entryPath)) {}

        else {
            context = Object.create(ContextMenuEntry.prototype);
            ContextMenuEntry.apply(context, arguments);
            this.contextMenu.add_child(context);
        }
    },


    reattach: function() {
        this.parentElement.insertBefore(this.element, this.parentElement.firstChild);
    },


    _eventListener: function() {
        let self = this;

        this.parentElement.addEventListener(this.event, function(event) {
            if (event.pageY <= document.documentElement.clientHeight / 2) {
                self.element.style.bottom = "unset";
                self.element.style.top = event.pageY + "px";
            }

            else {
                self.element.style.top = "unset";
                self.element.style.bottom = (document.documentElement.clientHeight - event.pageY) + "px";
            }

            if (event.pageX <= document.documentElement.clientWidth / 2) {
                self.element.style.right = "unset";
                self.element.style.left = event.pageX + "px";
            }

            else {
                self.element.style.left = "unset";
                self.element.style.right = (document.documentElement.clientWidth - event.pageX) + "px";
            }

            self.contextMenu.close_all();
            self.element.className = "";

            let target = event.target;

            while (target) {
                if(target.id) { self.element.classList.add("mzk-ctx-include-" + target.id); }

                target = target.parentNode;
            }

            addVisibilityLock(self.element);
            if (self.openCallback) { self.openCallback(event); }
        });

        this.element.addEventListener('mzk_ctx:close', function() {
            self.element.className = "";
            self.contextMenu.close_all();
        });
    },


    _keyListener: function() {
        let that = this;

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
    }
};
