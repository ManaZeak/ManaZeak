var Notification = function(title, message) {
    // TODO : test incoming var ...
    this.notification = null;
    this.duration = 3000;
    this.interval = 1;

    this.ui = {
        icon: null,
        title: null,
        message: null,
        close: null
    };

    this.title = title;
    this.message = message;

    this.init();

    // TODO : create notifController class, restyle notif
};

Notification.prototype = {
    init: function() {
        this.notification = document.createElement("div");
        this.notification.className = "notificationContainer";

        this.ui.icon = document.createElement("img");
        this.ui.icon.className = "icon";
        this.ui.icon.src = "../static/img/info.svg";

        this.ui.title= document.createElement("p");
        this.ui.title.className = "title2";
        this.ui.title.innerHTML = this.title;

        this.ui.message= document.createElement("p");
        this.ui.message.className = "message";
        this.ui.message.innerHTML = this.message;

        this.ui.close = document.createElement("img");
        this.ui.close.className = "close";
        this.ui.close.src = "../static/img/close.svg";

        this.notification.appendChild(this.ui.icon);
        this.notification.appendChild(this.ui.title);
        this.notification.appendChild(this.ui.message);
        this.notification.appendChild(this.ui.close);

        this.lifeCycle();
    },

    lifeCycle: function() {
        document.body.appendChild(this.notification); // Add notification div to body
        this.open();
        this.timeoutHandle = window.setTimeout(this.close.bind(this), this.duration);
        this.eventListener();
    },

    resetTimeout: function() {
        window.clearTimeout(this.timeoutHandle);
        this.timeoutHandle = window.setTimeout(this.close.bind(this), this.duration);
    },

    open: function() {
        var i = 0;
        var that = this;

        (function iterate () {
            if (i <= 100) {
                that.notification.style.opacity = i / 100;
                i += 2;
            }
            window.setTimeout(iterate, that.interval);
        })();
    },

    close: function() {
        window.clearTimeout(this.timeoutHandle);

        var i = 100;
        var that = this;

        (function iterate () {
            if (i >= 0) {
                that.notification.style.opacity = i / 100;
                i -= 2;

                if (i === 0) { that.notification.parentNode.removeChild(that.notification); } // Remove notification from body
            }
            window.setTimeout(iterate, that.interval);
        })();
    },

    eventListener: function() {
        this.notification.addEventListener("mousemove", this.resetTimeout.bind(this));
        this.ui.close.addEventListener("click", this.close.bind(this));
    }
};
