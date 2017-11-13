/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  UserMenu class - handle the user's menu                                            *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var UserMenu = function(parent) {
    this.menu = document.createElement("div");
    this.menu.id = "menu";
    this.menuEntry = {
        logout: null
    };
    this.outside = document.body;
    this.parent = parent;
    this.isVisible = false;


    this._init();
};


UserMenu.prototype = {

    _init: function() {
        this.parent.appendChild(this.menu);
        this.menuEntry.logout = document.createElement("div");
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


    toggleVisibilityLock: function() {
        if (!this.isVisible) {
            this.isVisible = !this.isVisible;
            addVisibilityLock(this.menu, "menuLocked");
        } else {
            this.isVisible = !this.isVisible;
            removeVisibilityLock(this.menu, "menuLocked");
        }
    },


    clickOutside: function(e) {
        if (!document.getElementById("userExpander").contains(e.target) && !document.getElementById("menu").contains(e.target)) {
            removeVisibilityLock(this.menu, "menuLocked");
        }
    },


    _eventListener: function() {
        this.menuEntry.logout.addEventListener("click", this.logOut.bind(this));
        this.outside.addEventListener("click", this.clickOutside.bind(this), false);
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
