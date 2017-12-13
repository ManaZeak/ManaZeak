/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  UserMenu class - handle the user's menu                                            *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let UserMenu = function(parent) {
    this.menu = document.createElement("div");
    this.menu.id = "menu";
    this.menuEntry = {
        logout: null,
        stats: null
    };
    this.outside = document.body;
    this.parent = parent;
    this.isVisible = false;

    this._init();
};


UserMenu.prototype = {

    _init: function() {
        this.parent.appendChild(this.menu);
        this.menuEntry.logout = document.createElement("DIV");
        this.menuEntry.stats = document.createElement("DIV");
        this.menuEntry.logout.className = "menuEntry";
        this.menuEntry.stats.className = "menuEntry";
        this.menuEntry.logout.innerHTML = "Log out";
        this.menuEntry.stats.innerHTML = "Stats";
        this.menu.appendChild(this.menuEntry.logout);
        this.menu.appendChild(this.menuEntry.stats);


        this._eventListener();
        this._keyListener();
    },


    logOut: function() {
        window.app.logOut();
    },


    getStats: function() {
        window.app.displayStats();
    },


    toggleVisibilityLock: function() {
        if (!this.isVisible) {
            this.isVisible = !this.isVisible;
            addVisibilityLock(this.menu);
        }

        else {
            this.isVisible = !this.isVisible;
            removeVisibilityLock(this.menu);
        }
    },


    clickOutside: function(e) {
        if (!document.getElementById("userExpander").contains(e.target) && !document.getElementById("menu").contains(e.target)) {
            removeVisibilityLock(this.menu);
        }
    },


    _eventListener: function() {
        this.menuEntry.logout.addEventListener("click", this.logOut.bind(this));
        this.menuEntry.stats.addEventListener("click", this.getStats.bind(this));
        this.outside.addEventListener("click", this.clickOutside.bind(this), false);
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
