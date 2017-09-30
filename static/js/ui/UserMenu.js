/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  UserMenu class - handle the user's menu                                            *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var UserMenu = function() {
    this.menu = document.getElementById("menu");
    this.isVisible = false;
};


UserMenu.prototype = {

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
    }
};
