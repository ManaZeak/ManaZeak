/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  UserMenu class - handle the user's menu                                            *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */



/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  WishList class                                 *
 *                                                 *
 *  Handle track information and suggests tracks,  *
 *  triggered on hover over a view entry           *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

let UserMenu = function(container) {
    this.ui = {
        container: document.createElement("DIV"),
        img: document.createElement("IMG")
    };

    this.menu = document.createElement("DIV");
    this.menu.id = "menu";
    this.menuEntry = {
        logout: null,
        stats: null
    };
    this.outside = document.body;
    this.isVisible = false;

    this._createUI(container);
};


UserMenu.prototype = {


//  --------------------------------  PUBLIC METHODS  --------------------------------  //





//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _updateSuggestionMode (private)
     * class  : TrackInfo
     * desc   : Update the suggestion UI title and icon elements according to the trackSuggestionMode attribute
     * arg    : {int} value - The set value (not mandatory)
     **/
    _createUI: function(container) {
        this.ui.container.id = "userExpander";
        this.ui.img.src = "/static/img/utils/user.svg";

        this.ui.container.appendChild(this.ui.img);

        this.menuEntry.logout = document.createElement("DIV");
        this.menuEntry.stats = document.createElement("DIV");
        this.menuEntry.logout.className = "menuEntry";
        this.menuEntry.stats.className = "menuEntry";
        this.menuEntry.logout.innerHTML = "Log out";
        this.menuEntry.stats.innerHTML = "Stats";

        let that = this;
        JSONParsedGetRequest(
            "ajax/isAdmin/",
            function(response) {
                if (response.IS_ADMIN) {
                    that.menuEntry.admin = document.createElement("DIV");
                    that.menuEntry.admin.className = "menuEntry";
                    that.menuEntry.admin.innerHTML = "Admin";
                    that.menuEntry.admin.addEventListener("click", that.getAdmin.bind(that));

                    that.menu.appendChild(that.menuEntry.admin);
                }

                that.menu.appendChild(that.menuEntry.stats);
                that.menu.appendChild(that.menuEntry.logout);
            }
        );

        this.ui.container.appendChild(this.menu);
        container.appendChild(this.ui.container);

        this._eventListener();
    },


    logOut: function() {
        window.app.logOut();
    },


    getStats: function() {
        window.app.displayStatsView();
    },

    getAdmin: function() {
        window.app.displayAdminView();
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
        let that = this;
        this.ui.img.addEventListener("click", function() {
            that.toggleVisibilityLock();
        });

        this.menuEntry.logout.addEventListener("click", this.logOut.bind(this));
        this.menuEntry.stats.addEventListener("click", this.getStats.bind(this));
        this.outside.addEventListener("click", this.clickOutside.bind(this), false);
    }
};





