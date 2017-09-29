var Menu = function() {
    this.menu = document.getElementById("menu");

    this.isVisible = false;
};

Menu.prototype = {

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
