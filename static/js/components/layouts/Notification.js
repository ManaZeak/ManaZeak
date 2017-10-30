/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Notification class - notifications to use in various case in ManaZeak              *
 *                                                                                     *
 *  title   : string - Title to put in notification header                             *
 *  message : string - Message to put in notification content                          *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var Notification = function(title, message) {
    this.notification = null;
    this.ui = {
        icon:    null,
        title:   null,
        message: null,
        close:   null
    };

    this.duration = 3000; // Notification visible duration
    this.interval = 1;    // Refreshing interval

    // TODO : test incoming var ...
    this.title = title;
    this.message = message;

    // TODO : create notifController class, restyle notif
    this._init();
};


Notification.prototype = {

    // Create notification skeleton
    _init: function() {
        // Creating UI elements
        this.notification = document.createElement("div");
        this.ui.icon      = document.createElement("img");
        this.ui.title     = document.createElement("p");
        this.ui.message   = document.createElement("p");
        this.ui.close     = document.createElement("img");

        // Setting class name
        this.notification.className = "notificationContainer";
        this.ui.icon.className      = "icon";
        this.ui.title.className     = "title2";
        this.ui.message.className   = "message";
        this.ui.close.className     = "close";

        // Setting image source
        this.ui.icon.src  = "../static/img/info.svg";
        this.ui.close.src = "../static/img/close.svg";

        // Setting text content
        this.ui.title.innerHTML   = this.title;
        this.ui.message.innerHTML = this.message;

        // Appending UI elements to notification container
        this.notification.appendChild(this.ui.icon);
        this.notification.appendChild(this.ui.title);
        this.notification.appendChild(this.ui.message);
        this.notification.appendChild(this.ui.close);

        // Running notification life cycle
        this._lifeCycle();
    },


    // Handle lifespan of the notification
    _lifeCycle: function() {
         // Add notification to body and add listeners
        document.body.appendChild(this.notification);
        this._eventListener();

        // Notification life cycle
        this._open();
        this.timeoutHandle = window.setTimeout(this._close.bind(this), this.duration);
    },


    // Reset the notification closing
    _resetTimeout: function() {
        window.clearTimeout(this.timeoutHandle);
        this.timeoutHandle = window.setTimeout(this._close.bind(this), this.duration);
    },


    //TODO: CSS Animation instead
    // Display the notification on screen
    _open: function() {
        var that = this;
        var i = 0;

        (function iterate () {
            if (i <= 100) {
                that.notification.style.opacity = i / 100;
                i += 2;
            }
            window.setTimeout(iterate, that.interval);
        })();
    },

    //TODO: CSS Animation instead
    // Remove the notification on screen
    _close: function() {
        var that = this;
        var i = 100;

        (function iterate () {
            if (i >= 0) {
                that.notification.style.opacity = i / 100;
                i -= 2;
                // Remove notification from body
                if (i === 0) { that.notification.parentNode.removeChild(that.notification); }
            }
            window.setTimeout(iterate, that.interval);
        })();

        window.clearTimeout(this.timeoutHandle);
    },


    // Notification event listeners
    _eventListener: function() {
        this.notification.addEventListener("mousemove", this._resetTimeout.bind(this));
        this.ui.close.addEventListener("click", this._close.bind(this));
    }
};
