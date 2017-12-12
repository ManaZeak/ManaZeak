/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Notification class - notifications to use in various case in ManaZeak              *
 *                                                                                     *
 *  title   : string - Title to put in notification header                             *
 *  message : string - Message to put in notification content                          *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let Notification = function(type, title, message) {
    this.notification = null;
    this.ui = {
        icon:           null,
        title:          null,
        message:        null,
        close:          null
    };

    this.duration = 3000; // Notification visible duration
    this.interval = 1;    // Refreshing interval

    // TODO : test incoming var ...
    this.type = type;
    this.title   = title;
    this.message = message;

    // TODO : create notifController class, restyle notif
    this._createUI();

    this._lifeCycle();
};


Notification.prototype = {

    _createUI: function() {
        this.notification = document.createElement("div");
        this.ui.icon      = document.createElement("img");
        this.ui.title     = document.createElement("p");
        this.ui.message   = document.createElement("p");
        this.ui.close     = document.createElement("img");

        this.notification.className = "notificationContainer";
        this.ui.icon.className      = "icon";
        this.ui.title.className     = "title";
        this.ui.message.className   = "message";
        this.ui.close.className     = "close";

        switch (this.type) {
            case "INFO":
                this.ui.icon.src  = "/static/img/utils/notification/info.svg";
                break;
            case "ERROR":
                this.ui.icon.src  = "/static/img/utils/notification/error.svg";
                break;
            default:
                this.ui.icon.src  = "/static/img/utils/notification/error.svg";
                break;
        }

        this.ui.close.src         = "/static/img/utils/notification/close.svg";

        this.ui.title.innerHTML   = this.title;
        this.ui.message.innerHTML = this.message;

        this.notification.appendChild(this.ui.icon);
        this.notification.appendChild(this.ui.title);
        this.notification.appendChild(this.ui.message);
        this.notification.appendChild(this.ui.close);
    },


    _lifeCycle: function() {
        document.body.appendChild(this.notification);
        this._eventListener();

        this._open();
        this.timeoutHandle = window.setTimeout(this._close.bind(this), this.duration);
    },


    _resetTimeout: function() {
        window.clearTimeout(this.timeoutHandle);
        this.timeoutHandle = window.setTimeout(this._close.bind(this), this.duration);
    },


    //TODO: CSS Animation instead
    _open: function() {
        let that = this;
        let i = 0;

        (function iterate () {
            if (i <= 100) {
                that.notification.style.opacity = i / 100;
                i += 2;
            }
            window.setTimeout(iterate, that.interval);
        })();
    },

    //TODO: CSS Animation instead
    _close: function() {
        let that = this;
        let i = 100;

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


    _eventListener: function() {
        this.notification.addEventListener("mousemove", this._resetTimeout.bind(this));
        this.ui.close.addEventListener("click", this._close.bind(this));
    }
};
