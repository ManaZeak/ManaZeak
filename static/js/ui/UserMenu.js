/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  UserMenu class - handle the user's menu                                            *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var UserMenu = function() {
    this.menu = mkElem("div");
    this.menu.id = "menu";
    this.menuEntry = {
        logout: null
    };
    this.isVisible = false;


    this._init();
};


UserMenu.prototype = {

    _init: function() {
        getById("userExpander").appendChild(this.menu);
        this.menuEntry.logout = mkElem("div");
        this.menuEntry.logout.id = "logOut";
        this.menuEntry.logout.className = "menuEntry";
        this.menuEntry.logout.innerHTML = "Log out";
        this.menu.appendChild(this.menuEntry.logout);


        this._eventListener();
        this._keyListener();
    },


    logOut: function() {
        getRequest(
            "logout",
            function() {
                location.reload();
            }
        );
    },


    addVisibilityLock: function() {
        if (!this.menu.className.match(/(?:^|\s)menuLocked(?!\S)/)) {
            this.menu.className += "menuLocked";
        }
    },


    removeVisibilityLock: function() {
        if (this.menu.className.match(/(?:^|\s)menuLocked(?!\S)/)) {
            this.menu.className = this.menu.className.replace(/(?:^|\s)menuLocked(?!\S)/g, '');
        }
    },


    toggleVisibilityLock: function() {
        if (!this.isVisible) {
            this.isVisible = !this.isVisible;
            this.addVisibilityLock();
        } else {
            this.isVisible = !this.isVisible;
            this.removeVisibilityLock();
        }
    },


    _eventListener: function() {
        this.menuEntry.logout.addEventListener("click", this.logOut.bind(this));
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
    }
};
