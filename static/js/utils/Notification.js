/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  Notification class                             *
 *                                                 *
 *  Notifications to use in various case           *
 *                                                 *
 *  type    : {string} "ERROR" or "INFO"           *
 *  title   : {string} Notification title          *
 *  message : {string} Notification message        *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class Notification {

    constructor(type, title, message) {
        // TODO : test incoming var ...
        // TODO : create notifController class
        this.type         = type;
        this.title        = title;
        this.message      = message;
        this.notification = null;
        this.duration     = 3000; // Notification visible duration
        this.interval     = 1;    // Refreshing interval
        this._createUI();
        this._lifeCycle();
    };

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _close (private)
     * class  : Notification
     * desc   : Make notification disappear
     **/
    _close() {
        //TODO: CSS Animation instead
        let that = this;
        let i    = 100;

        (function iterate () {
            if (i >= 0) {
                that.notification.style.opacity = i / 100;
                i -= 2;
                if (i === 0) { that.notification.parentNode.removeChild(that.notification); }
            }
            window.setTimeout(iterate, that.interval);
        })();

        window.clearTimeout(this.timeoutHandle);
    }


    /**
     * method : _createUI (private)
     * class  : Notification
     * desc   : Build UI elements
     **/
    _createUI() {
        this.ui = {
            icon:           document.createElement("IMG"),
            title:          document.createElement("P"),
            message:        document.createElement("P"),
            close:          document.createElement("IMG")
        };
        this.notification = document.createElement("DIV");

        this.notification.className = "notificationContainer";
        this.ui.icon.className      = "icon";
        this.ui.title.className     = "title";
        this.ui.message.className   = "message";
        this.ui.close.className     = "close";

        switch (this.type) {
            case "INFO":
                this.ui.icon.src    = "/static/img/utils/notification/info.svg";
                break;

            case "ERROR":
                this.ui.icon.src    = "/static/img/utils/notification/error.svg";
                break;

            default:
                this.ui.icon.src    = "/static/img/utils/notification/error.svg";
                break;
        }

        this.ui.close.src           = "/static/img/utils/notification/close.svg";
        this.ui.title.innerHTML     = this.title;
        this.ui.message.innerHTML   = this.message;

        this.notification.appendChild(this.ui.icon);
        this.notification.appendChild(this.ui.title);
        this.notification.appendChild(this.ui.message);
        this.notification.appendChild(this.ui.close);
    }


    /**
     * method : _eventListener (private)
     * class  : Notification
     * desc   : Notification event listeners
     **/
    _eventListener() {
        this.notification.addEventListener("mousemove", this._resetTimeout.bind(this));
        this.ui.close.addEventListener("click", this._close.bind(this));
    }


    /**
     * method : _lifeCycle (private)
     * class  : Notification
     * desc   : Launch the notification life cycle
     **/
    _lifeCycle() {
        document.body.appendChild(this.notification);
        this._eventListener();
        this._open();
        this.timeoutHandle = window.setTimeout(this._close.bind(this), this.duration);
    }


    /**
     * method : _open (private)
     * class  : Notification
     * desc   : Make notification appear
     **/
    _open() {
        //TODO: CSS Animation instead
        let that = this;
        let i    = 0;

        (function iterate () {
            if (i <= 100) {
                that.notification.style.opacity = i / 100;
                i += 2;
            }
            window.setTimeout(iterate, that.interval);
        })();
    }


    /**
     * method : _resetTimeout (private)
     * class  : Notification
     * desc   : Reset notification close timeout
     **/
    _resetTimeout() {
        window.clearTimeout(this.timeoutHandle);
        this.timeoutHandle = window.setTimeout(this._close.bind(this), this.duration);
    }

}

export default Notification